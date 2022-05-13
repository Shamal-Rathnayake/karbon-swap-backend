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
exports.validateMultipartFormData = exports.validateRouteParameters = exports.validateParams = exports.validateQueryParameters = exports.validateHeaderWithBody = exports.validateHeader = exports.validateBody = exports.checkUserRole = exports.getTokenFromHeader = void 0;
const formidable = __importStar(require("formidable-serverless"));
const ramda_1 = require("ramda");
const fs = __importStar(require("fs"));
const response_service_1 = require("./response.service");
const token_service_1 = require("./token.service");
const getTokenFromHeader = (req) => {
    if ((req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token") ||
        (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};
exports.getTokenFromHeader = getTokenFromHeader;
const checkUserRole = (role, grantedUserRoles) => {
    if (Array.isArray(grantedUserRoles) &&
        grantedUserRoles.length !== 0 &&
        grantedUserRoles.includes(role)) {
        return true;
    }
    else {
        throw new Error("Unauthorized to this route.");
    }
};
exports.checkUserRole = checkUserRole;
/**
 * Validate API request body according to the defined schema
 * @param schema
 * @returns {Function}
 */
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return (0, response_service_1.internalErrorHandle)(result.error.details[0].message, res);
        }
        next();
    };
};
exports.validateBody = validateBody;
const validateHeader = (grantedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = (0, exports.getTokenFromHeader)(req);
            const decoded = (0, token_service_1.verifyJwt)(token);
            const access = yield (0, exports.checkUserRole)(decoded.role, grantedRoles);
            if (!access) {
                return (0, response_service_1.internalErrorHandle)("User is unauthorized", res);
            }
            next();
        }
        catch (error) {
            return (0, response_service_1.internalErrorHandle)(`${error}`, res);
        }
    });
};
exports.validateHeader = validateHeader;
const validateHeaderWithBody = (grantedRoles, schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = (0, exports.getTokenFromHeader)(req);
            const decoded = (0, token_service_1.verifyJwt)(token);
            const access = yield (0, exports.checkUserRole)(decoded.role, grantedRoles);
            if (!access) {
                return (0, response_service_1.internalErrorHandle)("User is unauthorized", res);
            }
            const result = schema.validate(req.body);
            if (result.error) {
                return (0, response_service_1.internalErrorHandle)(result.error.details[0].message, res);
            }
            next();
        }
        catch (error) {
            return (0, response_service_1.internalErrorHandle)(`${error}`, res);
        }
    });
};
exports.validateHeaderWithBody = validateHeaderWithBody;
/**
 * Validate query parameters in the API request
 * @param schema
 * @returns {Function}
 */
const validateQueryParameters = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.query);
        if (result.error) {
            return (0, response_service_1.internalErrorHandle)(result.error.details[0].message, res);
        }
        next();
    };
};
exports.validateQueryParameters = validateQueryParameters;
/**
 * Validate query parameters in the API request
 * @param schema
 * @returns {Function}
 */
const validateParams = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.params);
        if (result.error) {
            return (0, response_service_1.internalErrorHandle)(result.error.details[0].message, res);
        }
        next();
    };
};
exports.validateParams = validateParams;
/**
 * Validate route parameters
 * @param schema
 * @returns {function(...[*]=)}
 */
const validateRouteParameters = (schema) => {
    // eslint-disable-next-line consistent-return
    return (req, res, next) => {
        const result = schema.validate(req.params);
        if (result.error) {
            return (0, response_service_1.customError)(result.error.details[0].message, res);
        }
        next();
    };
};
exports.validateRouteParameters = validateRouteParameters;
/**
 * Validate multipart form data
 * @param schema
 */
const validateMultipartFormData = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = formidable({
        keepExtensions: true,
    });
    const formFields = yield new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return (0, response_service_1.customError)(`${err}`, res);
            }
            resolve({ fields, files });
        });
    });
    const data = Object.assign(Object.assign({}, formFields.fields), formFields.files);
    Object.keys(data).forEach((key) => {
        if ({}.hasOwnProperty.call(data, key)) {
            try {
                // Convert strings to Json objects
                data[key] = JSON.parse(data[key]);
            }
            catch (e) {
                // continue regardless of error
            }
        }
    });
    // Validate form fields
    const result = schema.validate(data);
    const file = (0, ramda_1.pathOr)(null, ["files", "file"], formFields);
    if (result.error) {
        if (file) {
            // Delete file
            fs.unlinkSync(file.path);
        }
        return (0, response_service_1.internalErrorHandle)((0, ramda_1.pathOr)("Unknown error.", ["error", "details", 0, "message"], result), res);
    }
    // Assign values to request body
    req.body = data;
    next();
});
exports.validateMultipartFormData = validateMultipartFormData;
