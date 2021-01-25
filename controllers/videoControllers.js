import {videos} from "../db"
import routes from "../routes";

export const homeController = (req, res) => {

    return res.render('home', { pageTitle : 'Home', videos});
};
export const searchController = (req, res) => {
    //console.log(req.query);
    //const searchingBy = req.query.term; 아래와 동일함! 아래는 ES6방식
    const {query: { term : searchingBy}} = req;
    res.render('search', { pageTitle : 'Search', searchingBy: searchingBy, videos: videos});
};

export const uploadGETController = (req, res) => {
    res.render('upload', { pageTitle : 'Upload'});
};
export const uploadPOSTController = (req, res) => {
    const {
        body: file, title, description
    } = req;
    //TODO : video upload and save.
    res.redirect(routes.videoDetail(324344)); //fake ID
};


export const videosController = (req, res) => res.render('videos', { pageTitle : 'Videos'});
export const videoDetailController = (req, res) => res.render('videoDetail', { pageTitle : 'VideosDetail'});
export const editVideoController = (req, res) => res.render('editVideo', { pageTitle : 'EditVideo'});
export const deleteVideoController = (req, res) => res.render('deleteVideo', { pageTitle : 'DeleteVideo'});
