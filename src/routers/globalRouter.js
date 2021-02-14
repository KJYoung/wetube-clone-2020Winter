import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  homeController,
  searchController,
} from "../controllers/videoControllers";
import {
  joinGETController,
  joinPOSTController,
  loginGETController,
  loginPOSTController,
  logoutController,
  meController,
} from "../controllers/userControllers";
import { onlyPrivate, onlyPublic } from "../middlewares";
import {
  facebookLogin,
  facebookLoginPOST,
  githubLogin,
  githubLoginPOST,
} from "../controllers/socialLoginControllers";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, joinGETController);
globalRouter.post(
  routes.join,
  onlyPublic,
  joinPOSTController,
  loginPOSTController
);

globalRouter.get(routes.login, onlyPublic, loginGETController);
globalRouter.post(routes.login, onlyPublic, loginPOSTController);

globalRouter.get(routes.home, homeController);
globalRouter.get(routes.logout, onlyPrivate, logoutController);
globalRouter.get(routes.search, searchController);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  githubLoginPOST
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  facebookLoginPOST
);

globalRouter.get(routes.me, onlyPrivate, meController);
export default globalRouter;
