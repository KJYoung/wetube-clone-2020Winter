import routes from "../routes";
import Video from "../models/Video";

export const homeController = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }).populate("creator");
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    return res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const searchController = async (req, res) => {
  //const searchingBy = req.query.term; 아래와 동일함! 아래는 ES6방식
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      $or: [
        { title: { $regex: searchingBy, $options: "i" } },
        { description: { $regex: searchingBy, $options: "i" } },
      ],
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const uploadGETController = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};
export const uploadPOSTController = async (req, res) => {
  const {
    file: { location },
    body: { title, description },
  } = req;

  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  await req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetailController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({ path: "comments", populate: { path: "creator" } });
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editVideoGETController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      //Different Type! video.creator : object, req.user : string
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editVideoPOSTController = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideoController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      //Different Type! video.creator : object, req.user : string
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
