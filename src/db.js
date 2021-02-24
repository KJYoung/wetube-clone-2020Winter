import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_CONNECTION = process.env.PRODUCTION
  ? process.env.MONGO_URL_PROD_ATLAS
  : process.env.MONGO_URL;

mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB");
};
const handleError = (error) => {
  console.log(`error on DB connection : ${error}`);
};

db.once("open", handleOpen);
db.once("error", handleError);
