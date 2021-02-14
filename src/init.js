import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.MY_PORT || 5000;

app.listen(PORT);
//server.listen(PORT);
