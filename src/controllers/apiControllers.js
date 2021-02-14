import Video from "../models/Video";
import Comment from "../models/Comment";

export const registerViewController = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const addCommentController = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      video: video.id,
    });
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    video.save();
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const deleteCommentController = async (req, res) => {
  const {
    params: { id },
    body: { commentId, commentSpan },
    user,
  } = req;
  try {
    const video = await Video.findById(id).populate("comments");
    const targetComment = await Comment.findById(commentId);
    if (
      targetComment.text === commentSpan &&
      targetComment.creator.toString() === user.id
    ) {
      await video.comments.pull({ _id: commentId });
      await user.comments.pull({ _id: commentId });
      await Comment.findByIdAndRemove(commentId);
      user.save();
      video.save();
      res.status(200);
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const registerLikeController = (req, res) => {
  console.log(req, res);
};
