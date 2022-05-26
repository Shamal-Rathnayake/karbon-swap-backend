import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import config from "./src/config/config";
import http from "http";
import https from "https";
import routes from "./src/routes/index";
import initSubscriptions from "./src/services/subscription.service";
import sslService from "./src/services/ssl.service";

const httpPort = process.env.HTTP_PORT;
const httpsPort = process.env.HTTPS_PORT;

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
/* http.createServer(server).listen(httpPort, () => {
  console.log(`HTTP server running on port: ${httpPort}`);
  initSubscriptions();
});
 */
https.createServer(sslService(), server).listen(httpsPort, () => {
  console.log(`HTTPS server running on port: ${httpsPort}`);
  initSubscriptions();
});

export default server;
