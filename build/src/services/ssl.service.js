"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.default = () => ({
    key: fs.readFileSync(process.env.SSL_PRIV_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_KEY_PATH),
});
