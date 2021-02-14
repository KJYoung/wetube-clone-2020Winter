"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookLoginPOST = exports.facebookLoginCallback = exports.facebookLogin = exports.githubLoginPOST = exports.githubLoginCallback = exports.githubLogin = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var githubLogin = _passport["default"].authenticate("github");

exports.githubLogin = githubLogin;

var githubLoginCallback = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessToken, refreshToken, profile, cb) {
    var _profile$_json, id, avatarUrl, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatarUrl = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context.prev = 1;
            _context.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context.sent;

            if (!user) {
              _context.next = 12;
              break;
            }

            user.githubId = id; //정보 덮어쓰기 : #6.9 댓글에서 보고 떠오름.

            user.avatarUrl = avatarUrl;
            user.save();
            return _context.abrupt("return", cb(null, user));

          case 12:
            _context.next = 14;
            return _User["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatarUrl,
              localId: false
            });

          case 14:
            newUser = _context.sent;
            return _context.abrupt("return", cb(null, newUser));

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", cb(_context.t0));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 18]]);
  }));

  return function githubLoginCallback(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var githubLoginPOST = function githubLoginPOST(req, res) {
  res.redirect(_routes["default"].home);
};

exports.githubLoginPOST = githubLoginPOST;

var facebookLogin = _passport["default"].authenticate("facebook");

exports.facebookLogin = facebookLogin;

var facebookLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(accessToken, refreshToken, profile, cb) {
    var _profile$_json2, id, name, email, user, avatarUrl, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json2 = profile._json, id = _profile$_json2.id, name = _profile$_json2.name, email = _profile$_json2.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;
            avatarUrl = "https://graph.facebook.com/".concat(id, "/picture?type=large&access_token=").concat(accessToken);

            if (!user) {
              _context2.next = 13;
              break;
            }

            user.facebookId = id; //정보 덮어쓰기 : #6.9 댓글에서 보고 떠오름.

            user.avatarUrl = avatarUrl;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 13:
            _context2.next = 15;
            return _User["default"].create({
              email: email,
              name: name,
              facebookId: id,
              avatarUrl: avatarUrl,
              localId: false
            });

          case 15:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 17:
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 19]]);
  }));

  return function facebookLoginCallback(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

exports.facebookLoginCallback = facebookLoginCallback;

var facebookLoginPOST = function facebookLoginPOST(req, res) {
  res.redirect(_routes["default"].home);
};

exports.facebookLoginPOST = facebookLoginPOST;