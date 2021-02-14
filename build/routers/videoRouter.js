"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoControllers = require("../controllers/videoControllers");

var _middlewares = require("../middlewares");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router(); //UPLOAD VIDEO


videoRouter.get(_routes["default"].upload, _middlewares.onlyPrivate, _videoControllers.uploadGETController);
videoRouter.post(_routes["default"].upload, _middlewares.uploadVideo, _middlewares.onlyPrivate, _videoControllers.uploadPOSTController);
videoRouter.get(_routes["default"].videoDetail(), _videoControllers.videoDetailController); //EDIT VIDEO

videoRouter.get(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoControllers.editVideoGETController);
videoRouter.post(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoControllers.editVideoPOSTController);
videoRouter.get(_routes["default"].deleteVideo(), _middlewares.onlyPrivate, _videoControllers.deleteVideoController);
var _default = videoRouter;
exports["default"] = _default;