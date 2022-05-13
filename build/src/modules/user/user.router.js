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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_permissions_1 = __importDefault(require("./user.permissions"));
const controller = __importStar(require("./user.controller"));
const schema = __importStar(require("./user.schema"));
const validator = __importStar(require("../../services/validator.service"));
const router = express_1.default.Router();
router
    .route(user_permissions_1.default.createUser.path)
    .post(validator.validateBody(schema.createUser), controller.createUser);
router
    .route(user_permissions_1.default.createUserByReferralCode.path)
    .post(validator.validateBody(schema.createUserByReferralCode), controller.createUserByReferralCode);
router
    .route(user_permissions_1.default.updateUser.path)
    .put(validator.validateHeaderWithBody(user_permissions_1.default.updateUser.grantedUserRoles, schema.updateUser), controller.updateUser);
router.route(user_permissions_1.default.login.path).post(validator.validateBody(schema.login), controller.login);
router
    .route(user_permissions_1.default.getUserById.path)
    .get(validator.validateHeader(user_permissions_1.default.getUserById.grantedUserRoles), validator.validateRouteParameters(schema.id), controller.getUserById);
router
    .route(user_permissions_1.default.getReferees.path)
    .get(validator.validateHeader(user_permissions_1.default.getUserById.grantedUserRoles), validator.validateRouteParameters(schema.id), controller.getAllReferees);
exports.default = router;
