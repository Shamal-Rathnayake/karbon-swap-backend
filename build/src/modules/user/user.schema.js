"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = exports.login = exports.updateUser = exports.createUserByReferralCode = exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
const config_1 = __importDefault(require("../../config/config"));
exports.createUser = joi_1.default.object().keys({
    username: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string(),
    email: joi_1.default
        .string()
        .email({ tlds: { allow: false }, ignoreLength: true })
        .required(),
    password: joi_1.default.string().min(8).max(32).required(),
});
exports.createUserByReferralCode = joi_1.default.object().keys({
    username: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string(),
    email: joi_1.default
        .string()
        .email({ tlds: { allow: false }, ignoreLength: true })
        .required(),
    password: joi_1.default.string().min(8).max(32).required(),
    referralCode: joi_1.default.string().required(),
});
exports.updateUser = joi_1.default.object().keys({
    id: joi_1.default.string().alphanum().min(24).max(24).required(),
    role: joi_1.default
        .string()
        .required()
        .valid(...Object.values(config_1.default.userRoles)),
    username: joi_1.default.string(),
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    email: joi_1.default.string().email({ tlds: { allow: false }, ignoreLength: true }),
});
exports.login = joi_1.default.object().keys({
    email: joi_1.default
        .string()
        .email({ tlds: { allow: false }, ignoreLength: true })
        .required(),
    password: joi_1.default.string().min(8).max(32).required(),
    role: joi_1.default
        .string()
        .required()
        .valid(...Object.values(config_1.default.userRoles))
        .required(),
});
exports.id = joi_1.default.object().keys({
    id: joi_1.default.string().alphanum().min(24).max(24).required(),
});
