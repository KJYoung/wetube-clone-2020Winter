import express from "express";
import routes from "../routes";
import { homeController, searchController } from "../controllers/videoControllers";
import { joinGETController, joinPOSTController, loginGETController, loginPOSTController, logoutController } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get(routes.join, joinGETController);
globalRouter.post(routes.join, joinPOSTController);

globalRouter.get(routes.login, loginGETController);
globalRouter.post(routes.login, loginPOSTController);

globalRouter.get(routes.home, homeController);
globalRouter.get(routes.logout, logoutController);
globalRouter.get(routes.search, searchController);
export default globalRouter;
