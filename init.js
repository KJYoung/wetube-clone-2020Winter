import dotenv from "dotenv";
import "./db";
import { server } from "./app";

import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Listening on : https://localhost:${PORT}`);
};

server.listen(PORT, handleListening);
