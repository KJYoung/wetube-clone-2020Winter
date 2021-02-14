"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoControllers = require("../controllers/videoControllers");

var _userControllers = require("../controllers/userControllers");

var _middlewares = require("../middlewares");

var _socialLoginControllers = require("../controllers/socialLoginControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userControllers.joinGETController);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userControllers.joinPOSTController, _userControllers.loginPOSTController);
globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userControllers.loginGETController);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userControllers.loginPOSTController);
globalRouter.get(_routes["default"].home, _videoControllers.homeController);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userControllers.logoutController);
globalRouter.get(_routes["default"].search, _videoControllers.searchController);
globalRouter.get(_routes["default"].github, _socialLoginControllers.githubLogin);
globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate("github", {
  failureRedirect: _routes["default"].login
}), _socialLoginControllers.githubLoginPOST);
globalRouter.get(_routes["default"].facebook, _socialLoginControllers.facebookLogin);
globalRouter.get(_routes["default"].facebookCallback, _passport["default"].authenticate("facebook", {
  failureRedirect: _routes["default"].login
}), _socialLoginControllers.facebookLoginPOST);
globalRouter.get(_routes["default"].me, _middlewares.onlyPrivate, _userControllers.meController);
var _default = globalRouter;
exports["default"] = _default;