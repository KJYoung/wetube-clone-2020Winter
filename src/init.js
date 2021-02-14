import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const handleListening = () => {
  console.log(`✅ Listening on : https://localhost:${PORT}`);
};

app.listen(process.env.PORT || 4000, handleListening);
