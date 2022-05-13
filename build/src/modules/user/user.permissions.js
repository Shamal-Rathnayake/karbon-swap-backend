"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config/config"));
const { userRoles } = config_1.default;
exports.default = {
    createAdmin: {
        path: "/admin",
    },
    createUser: {
        path: "/create",
    },
    createUserByReferralCode: {
        path: "/user-by-reference",
    },
    updateUser: {
        path: "/",
        grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
    },
    updatePassword: {
        path: "/password",
        grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
    },
    changePassword: {
        path: "/password/change",
        grantedUserRoles: [userRoles.superAdmin, userRoles.admin],
    },
    deleteUser: {
        path: "/:id",
        grantedUserRoles: [userRoles.superAdmin, userRoles.admin],
    },
    login: {
        path: "/login",
    },
    getUserById: {
        path: "/:id",
        grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
    },
    getReferees: {
        path: "/referees/:id",
        grantedUserRoles: [userRoles.superAdmin, userRoles.admin, userRoles.user],
    },
};
