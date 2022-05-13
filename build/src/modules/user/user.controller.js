"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReferees = exports.getUserById = exports.login = exports.updateUser = exports.createUserByReferralCode = exports.createUser = void 0;
const userService = __importStar(require("./user.service"));
const response = __importStar(require("../../services/response.service"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.createUser(req.body);
        return response.successWithData(user, res);
    }
    catch (error) {
        return response.customError(`${error}`, res);
    }
});
exports.createUser = createUser;
const createUserByReferralCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.createUserByReferralCode(req.body);
        return response.successWithData(user, res);
    }
    catch (error) {
        return response.customError(`${error}`, res);
    }
});
exports.createUserByReferralCode = createUserByReferralCode;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.updateUser(req.body);
        return response.successWithDataAndToken(user, res);
    }
    catch (error) {
        return response.customError(`${error}`, res);
    }
});
exports.updateUser = updateUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.login(req.body);
        return response.successWithDataAndToken(user, res);
    }
    catch (error) {
        return response.customError(`${error}`, res);
    }
});
exports.login = login;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserById(req.params.id);
        return response.successWithData(user, res);
    }
    catch (error) {
        return response.customError(`${error}`, res);
    }
});
exports.getUserById = getUserById;
const getAllReferees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getAllReferees(req.params.id);
        return response.successWithData(user, res);
    }
    catch (error) {
        return response.customError(`${error}`, res);
    }
});
exports.getAllReferees = getAllReferees;
