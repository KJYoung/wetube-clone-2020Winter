import express from "express";
import routes from "../routes";

import {
  userDetailController,
  editProfileController,
  changePasswordController,
} from "../controllers/userControllers";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfileController);
userRouter.get(routes.changePassword, onlyPrivate, changePasswordController);
userRouter.get(routes.userDetail(), onlyPrivate, userDetailController);

export default userRouter;
