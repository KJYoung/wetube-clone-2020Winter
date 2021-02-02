import express from "express";
import routes from "../routes";

import {
  userDetailController,
  editProfileGETController,
  changePasswordController,
  editProfilePOSTController,
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfileGETController);

userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvatar,
  editProfilePOSTController
);

userRouter.get(routes.changePassword, onlyPrivate, changePasswordController);
userRouter.get(routes.userDetail(), onlyPrivate, userDetailController);

export default userRouter;
