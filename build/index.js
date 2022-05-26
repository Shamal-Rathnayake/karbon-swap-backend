"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./src/config/config"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const index_1 = __importDefault(require("./src/routes/index"));
const subscription_service_1 = __importDefault(require("./src/services/subscription.service"));
const ssl_service_1 = __importDefault(require("./src/services/ssl.service"));
const httpPort = process.env.HTTP_PORT;
const httpsPort = process.env.HTTPS_PORT;
// Create express server
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use((0, helmet_1.default)());
server.use(express_1.default.static(__dirname));
server.use(config_1.default.apiUrl, index_1.default);
// Connect to database
mongoose_1.default.connect(`mongodb:${process.env.DATABASE}`);
mongoose_1.default.set("debug", JSON.parse(process.env.DATABASE_DEBUG));
// Create http server
http_1.default.createServer(server).listen(httpPort, () => {
    console.log(`HTTP server running on port: ${httpPort}`);
    (0, subscription_service_1.default)();
});
https_1.default.createServer((0, ssl_service_1.default)(), server).listen(httpsPort, () => {
    console.log(`HTTPS server running on port: ${httpsPort}`);
    (0, subscription_service_1.default)();
});
exports.default = server;
