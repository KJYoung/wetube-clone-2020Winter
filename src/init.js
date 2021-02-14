import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

app.listen(process.env.MY_PORT || 5000);
//server.listen(PORT);
