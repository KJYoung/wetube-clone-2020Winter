import express from "express";
import routes from "../routes";
import {
  addCommentController,
  registerViewController,
} from "../controllers/apiControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerViewController);
apiRouter.post(routes.addComment, addCommentController);
export default apiRouter;
