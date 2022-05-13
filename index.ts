import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import config from "./src/config/config";
import http from "http";
import routes from "./src/routes/index";

const httpPort = process.env.HTTP_PORT;

// Create express server
const server = express();
server.use(cors());
server.use(helmet());
server.use(express.static(__dirname));

server.use(config.apiUrl, routes);

// Connect to database
mongoose.connect(`mongodb:${process.env.DATABASE}`);
mongoose.set("debug", JSON.parse(process.env.DATABASE_DEBUG as string));

// Create http server
http.createServer(server).listen(httpPort, () => {
  console.log(`HTTP server running on port: ${httpPort}`);
});

export default server;
