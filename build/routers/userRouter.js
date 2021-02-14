"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userControllers = require("../controllers/userControllers");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get(_routes["default"].editProfile, _middlewares.onlyPrivate, _userControllers.editProfileGETController);
userRouter.post(_routes["default"].editProfile, _middlewares.onlyPrivate, _middlewares.uploadAvatar, _userControllers.editProfilePOSTController);
userRouter.get(_routes["default"].changePassword, _middlewares.onlyPrivate, _userControllers.changePasswordGETController);
userRouter.post(_routes["default"].changePassword, _middlewares.onlyPrivate, _userControllers.changePasswordPOSTController);
userRouter.get(_routes["default"].userDetail(), _userControllers.userDetailController);
var _default = userRouter;
exports["default"] = _default;