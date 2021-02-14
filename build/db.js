"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}); // mongoose.connect(process.env.MONGO_URL_PROD_ATLAS, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });


var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  console.log("✅ Connected to DB");
};

var handleError = function handleError(error) {
  console.log("error on DB connection : ".concat(error));
};

db.once("open", handleOpen);
db.once("error", handleError);