export const homeController = (req, res) => res.render('home');
export const searchController = (req, res) => res.send("SEARCH, by controller");
export const videosController = (req, res) => res.send("videos, by controller");
export const videoDetailController = (req, res) => res.send("videoDetail, by controller");
export const uploadController = (req, res) => res.send("upload, by controller");
export const editVideoController = (req, res) => res.send("editVideo, by controller");
export const deleteVideoController = (req, res) => res.send("deleteVideo, by controller");
