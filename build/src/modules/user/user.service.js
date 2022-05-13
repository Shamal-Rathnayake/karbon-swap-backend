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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReferees = exports.login = exports.getUserById = exports.updateUser = exports.createUserByReferralCode = exports.createUser = void 0;
const config_1 = __importDefault(require("../../config/config"));
const repository = __importStar(require("../../services/repository.service"));
const user_model_1 = __importDefault(require("./user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield getUserByEmail(body.email, config_1.default.userRoles.user);
    if (existingUser)
        throw new Error("Email already exists");
    let newUser = new user_model_1.default(body);
    newUser.setPassword(body.password);
    newUser = yield repository.save(newUser);
    newUser = newUser.toObject();
    const { password, salt, __v } = newUser, rest = __rest(newUser, ["password", "salt", "__v"]);
    return rest;
});
exports.createUser = createUser;
const createUserByReferralCode = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield getUserByEmail(body.email, config_1.default.userRoles.user);
    if (existingUser)
        throw new Error("Email already exists");
    const referer = yield getUserByReferralCode(body.referralCode);
    if (!referer)
        throw new Error("Invalid referral code");
    let newUser = new user_model_1.default(body);
    newUser.setPassword(body.password);
    newUser.referer = referer._id;
    newUser = yield repository.save(newUser);
    yield incrementRefereeCount(referer._id);
    newUser = newUser.toObject();
    const { password, salt, __v } = newUser, rest = __rest(newUser, ["password", "salt", "__v"]);
    return rest;
});
exports.createUserByReferralCode = createUserByReferralCode;
const updateUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield getUserFromId(body.id);
    if (!existingUser)
        throw new Error("Invalid user id");
    const existingUserEmail = yield getUserByEmail(body.email, body.role);
    if (existingUserEmail)
        throw new Error("Email already exists");
    delete body.role;
    let updatedUser = yield repository.updateOne(user_model_1.default, {
        _id: new mongoose_1.default.Types.ObjectId(existingUser._id),
    }, body, {
        returnNewDocument: true,
        returnDocument: "after",
    });
    updatedUser = updatedUser.toObject();
    const { password, salt, __v } = updatedUser, rest = __rest(updatedUser, ["password", "salt", "__v"]);
    return rest;
});
exports.updateUser = updateUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser = yield getUserFromId(id);
    if (!existingUser)
        throw new Error("Invalid user id");
    existingUser = existingUser.toObject();
    const { password, salt, __v } = existingUser, rest = __rest(existingUser, ["password", "salt", "__v"]);
    return rest;
});
exports.getUserById = getUserById;
const login = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield getUserByEmail(body.email, body.role);
    if (!existingUser)
        throw new Error("Invalid email");
    const passwordValid = existingUser.validatePassword(body.password);
    if (!passwordValid)
        throw new Error("Invalid password");
    const _a = existingUser.toObject(), { password, salt, __v } = _a, rest = __rest(_a, ["password", "salt", "__v"]);
    return rest;
});
exports.login = login;
const getAllReferees = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser = yield getUserFromId(id);
    if (!existingUser)
        throw new Error("Invalid user id");
    const referees = yield repository.findMany(user_model_1.default, {
        referer: new mongoose_1.default.Types.ObjectId(id),
        delete_date: null,
    }, {
        password: 0,
        salt: 0,
        __v: 0,
    });
    return referees;
});
exports.getAllReferees = getAllReferees;
const getUserByEmail = (email, role) => {
    let roles = [role];
    if (role === config_1.default.userRoles.admin)
        roles = [config_1.default.userRoles.admin, config_1.default.userRoles.superAdmin];
    return repository.findOne(user_model_1.default, {
        email: { $regex: `^${email}$`, $options: "i" },
        role: { $in: roles },
        delete_date: null,
    });
};
const getUserByReferralCode = (code) => {
    return repository.findOne(user_model_1.default, {
        referralId: code,
        delete_date: null,
    });
};
const getUserFromId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return repository.findOne(user_model_1.default, {
        _id: new mongoose_1.default.Types.ObjectId(id),
        delete_date: null,
    });
});
const incrementRefereeCount = (id) => {
    return repository.updateOne(user_model_1.default, {
        _id: new mongoose_1.default.Types.ObjectId(id),
    }, {
        $inc: {
            refereeCount: 1,
        },
    });
};
