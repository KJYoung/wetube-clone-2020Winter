import {videos} from "../db"

export const homeController = (req, res) => {

    return res.render('home', { pageTitle : 'Home', videos});
};
export const searchController = (req, res) => {
    //console.log(req.query);
    //const searchingBy = req.query.term; 아래와 동일함! 아래는 ES6방식
    const {query: { term : searchingBy}} = req;
    res.render('search', { pageTitle : 'Search', searchingBy: searchingBy});
};
export const videosController = (req, res) => res.render('videos', { pageTitle : 'Videos'});
export const videoDetailController = (req, res) => res.render('videoDetail', { pageTitle : 'VideosDetail'});
export const uploadController = (req, res) => res.render('upload', { pageTitle : 'Upload'});
export const editVideoController = (req, res) => res.render('editVideo', { pageTitle : 'EditVideo'});
export const deleteVideoController = (req, res) => res.render('deleteVideo', { pageTitle : 'DeleteVideo'});
