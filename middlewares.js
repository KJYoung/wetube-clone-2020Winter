import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube-kim/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube-kim/avatar",
  }),
});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
