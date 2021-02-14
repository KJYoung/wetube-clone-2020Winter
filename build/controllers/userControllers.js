"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePasswordPOSTController = exports.changePasswordGETController = exports.editProfilePOSTController = exports.editProfileGETController = exports.userDetailController = exports.meController = exports.logoutController = exports.loginPOSTController = exports.loginGETController = exports.joinPOSTController = exports.joinGETController = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var joinGETController = function joinGETController(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};

exports.joinGETController = joinGETController;

var joinPOSTController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 6;
              break;
            }

            res.status(400); //error code. Bad request.

            return _context.abrupt("return", res.render("join", {
              pageTitle: "Join"
            }));

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _User["default"])({
              name: name,
              email: email,
              localId: true,
              avatarUrl: _routes["default"].defaultAvatar
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _User["default"].register(user, password);

          case 12:
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(_routes["default"].home); //개선 지점.

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function joinPOSTController(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.joinPOSTController = joinPOSTController;

var loginGETController = function loginGETController(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.loginGETController = loginGETController;

var loginPOSTController = _passport["default"].authenticate("local", {
  successRedirect: _routes["default"].home,
  failureRedirect: _routes["default"].login
});

exports.loginPOSTController = loginPOSTController;

var logoutController = function logoutController(req, res) {
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logoutController = logoutController;

var meController = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].findById(req.user.id).populate("videos");

          case 2:
            user = _context2.sent;
            res.render("userDetail", {
              pageTitle: "MyDetail",
              user: user
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function meController(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.meController = meController;

var userDetailController = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _User["default"].findById(id).populate("videos");

          case 4:
            user = _context3.sent;
            res.render("userDetail", {
              pageTitle: "UserDetail",
              user: user
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function userDetailController(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.userDetailController = userDetailController;

var editProfileGETController = function editProfileGETController(req, res) {
  res.render("editProfile", {
    pageTitle: "EditProfile"
  });
};

exports.editProfileGETController = editProfileGETController;

var editProfilePOSTController = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var name, file, oldEmail, newEmail;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            name = req.body.name, file = req.file;
            oldEmail = req.user.email;
            newEmail = req.body.email ? req.body.email : oldEmail;
            _context4.prev = 3;
            _context4.next = 6;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: newEmail,
              avatarUrl: file ? file.location : req.user.avatarUrl
            });

          case 6:
            if (newEmail === oldEmail) {
              res.redirect(_routes["default"].me);
            } else {
              res.redirect(_routes["default"].home);
            }

            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](3);
            res.redirect(_routes["default"].editProfile);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 9]]);
  }));

  return function editProfilePOSTController(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.editProfilePOSTController = editProfilePOSTController;

var changePasswordGETController = function changePasswordGETController(req, res) {
  res.render("changePassword", {
    pageTitle: "ChangePassword"
  });
};

exports.changePasswordGETController = changePasswordGETController;

var changePasswordPOSTController = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword, newPassword1 = _req$body2.newPassword1;
            _context5.prev = 1;

            if (!(newPassword !== newPassword1)) {
              _context5.next = 6;
              break;
            }

            res.redirect(400, "/users".concat(_routes["default"].changePassword));
            _context5.next = 9;
            break;

          case 6:
            _context5.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            res.redirect(_routes["default"].me);

          case 9:
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](1);
            res.redirect(400, "/users".concat(_routes["default"].changePassword));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 11]]);
  }));

  return function changePasswordPOSTController(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.changePasswordPOSTController = changePasswordPOSTController;