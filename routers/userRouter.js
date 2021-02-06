import express from "express";
import routes from "../routes";

import {
  userDetailController,
  editProfileGETController,
  editProfilePOSTController,
  changePasswordGETController,
  changePasswordPOSTController,
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

userRouter.get(routes.changePassword, onlyPrivate, changePasswordGETController);
userRouter.post(
  routes.changePassword,
  onlyPrivate,
  changePasswordPOSTController
);
userRouter.get(routes.userDetail(), userDetailController);

export default userRouter;
