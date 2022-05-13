"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successWithDataAndToken = exports.internalErrorHandle = exports.customError = exports.successWithMessage = exports.successWithData = void 0;
const token_service_1 = require("./token.service");
const successWithData = (data, res) => {
    return res.json({
        status: true,
        data,
    });
};
exports.successWithData = successWithData;
const successWithMessage = (message, res) => {
    return res.json({
        status: true,
        msg: message,
    });
};
exports.successWithMessage = successWithMessage;
const customError = (message, res) => {
    return res.status(422).json({
        status: false,
        message: message,
    });
};
exports.customError = customError;
const internalErrorHandle = (message, res) => {
    return res.status(422).json({
        status: false,
        message,
    });
};
exports.internalErrorHandle = internalErrorHandle;
const successWithDataAndToken = (data, res) => {
    return res.json({
        status: true,
        data,
        token: (0, token_service_1.generateJwt)(data._id, data.email, data.role),
    });
};
exports.successWithDataAndToken = successWithDataAndToken;
