import express from "express";
import routes from "../routes";

import { usersController, userDetailController, editProfileController, changePasswordController } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get(routes.users, usersController);
userRouter.get(routes.userDetail , userDetailController);
userRouter.get(routes.editProfile, editProfileController);
userRouter.get(routes.changePassword, changePasswordController);

export default userRouter;