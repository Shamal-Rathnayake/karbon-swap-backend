import * as mongoose from "mongoose";
import { IUserMongoose } from "./user.interface";
import config from "../../config/config";
import * as crypto from "crypto";
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";

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
    default: config.userRoles.user,
    enum: Object.values(config.userRoles),
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

userSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: "user",
  field: "referralCount",
});

userSchema.pre("save", function (next) {
  this.referralId = `RU-${this.referralCount}`;
  next();
});

export default mongoose.model<IUserMongoose>("user", userSchema);
