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
const mongoose = __importStar(require("mongoose"));
const config_1 = __importDefault(require("../../config/config"));
const crypto = __importStar(require("crypto"));
const mongoose_auto_increment_reworked_1 = require("mongoose-auto-increment-reworked");
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        default: config_1.default.userRoles.user,
        enum: Object.values(config_1.default.userRoles),
    },
    deleteDate: {
        type: Date,
    },
    referralId: {
        type: String,
    },
    referer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    referralCount: {
        type: Number,
        default: 0,
    },
    refereeCount: {
        type: Number,
        default: 0,
    },
    salt: {
        type: String,
    },
}, {
    timestamps: true,
});
// Validate password
userSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    return this.password === hash;
};
// Hash the password
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};
userSchema.plugin(mongoose_auto_increment_reworked_1.MongooseAutoIncrementID.plugin, {
    modelName: "user",
    field: "referralCount",
});
userSchema.pre("save", function (next) {
    this.referralId = `RU-${this.referralCount}`;
    next();
});
exports.default = mongoose.model("user", userSchema);
