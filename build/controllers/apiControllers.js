"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerLikeController = exports.deleteCommentController = exports.addCommentController = exports.registerViewController = void 0;

var _Video = _interopRequireDefault(require("../models/Video"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var registerViewController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.prev = 1;
            _context.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context.sent;
            video.views += 1;
            video.save();
            res.status(200);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            res.status(400);

          case 13:
            _context.prev = 13;
            res.end();
            return _context.finish(13);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10, 13, 16]]);
  }));

  return function registerViewController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.registerViewController = registerViewController;

var addCommentController = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, comment, user, video, newComment;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context2.prev = 1;
            _context2.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context2.sent;
            _context2.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user.id,
              video: video.id
            });

          case 7:
            newComment = _context2.sent;
            video.comments.push(newComment.id);
            user.comments.push(newComment.id);
            video.save();
            user.save();
            res.status(200);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](1);
            res.status(400);

          case 18:
            _context2.prev = 18;
            res.end();
            return _context2.finish(18);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 15, 18, 21]]);
  }));

  return function addCommentController(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addCommentController = addCommentController;

var deleteCommentController = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, _req$body, commentId, commentSpan, user, video, targetComment;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id, _req$body = req.body, commentId = _req$body.commentId, commentSpan = _req$body.commentSpan, user = req.user;
            _context3.prev = 1;
            _context3.next = 4;
            return _Video["default"].findById(id).populate("comments");

          case 4:
            video = _context3.sent;
            _context3.next = 7;
            return _Comment["default"].findById(commentId);

          case 7:
            targetComment = _context3.sent;

            if (!(targetComment.text === commentSpan && targetComment.creator.toString() === user.id)) {
              _context3.next = 20;
              break;
            }

            _context3.next = 11;
            return video.comments.pull({
              _id: commentId
            });

          case 11:
            _context3.next = 13;
            return user.comments.pull({
              _id: commentId
            });

          case 13:
            _context3.next = 15;
            return _Comment["default"].findByIdAndRemove(commentId);

          case 15:
            user.save();
            video.save();
            res.status(200);
            _context3.next = 21;
            break;

          case 20:
            throw Error();

          case 21:
            _context3.next = 27;
            break;

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            res.status(400);

          case 27:
            _context3.prev = 27;
            res.end();
            return _context3.finish(27);

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 23, 27, 30]]);
  }));

  return function deleteCommentController(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteCommentController = deleteCommentController;

var registerLikeController = function registerLikeController(req, res) {
  console.log(req, res);
};

exports.registerLikeController = registerLikeController;