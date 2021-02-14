"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _apiControllers = require("../controllers/apiControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post(_routes["default"].registerView, _apiControllers.registerViewController);
apiRouter.post(_routes["default"].addComment, _apiControllers.addCommentController);
apiRouter.post(_routes["default"].deleteComment, _apiControllers.deleteCommentController);
var _default = apiRouter;
exports["default"] = _default;