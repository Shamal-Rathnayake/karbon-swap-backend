import * as formidable from "formidable-serverless";
import { pathOr } from "ramda";
import * as fs from "fs";
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

import { customError, internalErrorHandle } from "./response.service";
import { verifyJwt } from "./token.service";

export const getTokenFromHeader = (req: Request): string | null => {
  if (
    (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

export const checkUserRole = (role: string, grantedUserRoles: Array<string>) => {
  if (
    Array.isArray(grantedUserRoles) &&
    grantedUserRoles.length !== 0 &&
    grantedUserRoles.includes(role)
  ) {
    return true;
  } else {
    throw new Error("Unauthorized to this route.");
  }
};

/**
 * Validate API request body according to the defined schema
 * @param schema
 * @returns {Function}
 */
export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);

    if (result.error) {
      return internalErrorHandle(result.error.details[0].message, res);
    }
    next();
  };
};

export const validateHeader = (grantedRoles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = getTokenFromHeader(req);
      const decoded = verifyJwt(token);
      const access = await checkUserRole(decoded.role, grantedRoles);
      if (!access) {
        return internalErrorHandle("User is unauthorized", res);
      }
      next();
    } catch (error) {
      return internalErrorHandle(`${error}`, res);
    }
  };
};

export const validateHeaderWithBody = (grantedRoles: Array<string>, schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = getTokenFromHeader(req);
      const decoded = verifyJwt(token);
      const access = await checkUserRole(decoded.role, grantedRoles);
      if (!access) {
        return internalErrorHandle("User is unauthorized", res);
      }
      const result = schema.validate(req.body);
      if (result.error) {
        return internalErrorHandle(result.error.details[0].message, res);
      }
      next();
    } catch (error) {
      return internalErrorHandle(`${error}`, res);
    }
  };
};

/**
 * Validate query parameters in the API request
 * @param schema
 * @returns {Function}
 */
export const validateQueryParameters = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.query);
    if (result.error) {
      return internalErrorHandle(result.error.details[0].message, res);
    }
    next();
  };
};

/**
 * Validate query parameters in the API request
 * @param schema
 * @returns {Function}
 */
export const validateParams = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return internalErrorHandle(result.error.details[0].message, res);
    }
    next();
  };
};

/**
 * Validate route parameters
 * @param schema
 * @returns {function(...[*]=)}
 */
export const validateRouteParameters = (schema) => {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return customError(result.error.details[0].message, res);
    }

    next();
  };
};

/**
 * Validate multipart form data
 * @param schema
 */
export const validateMultipartFormData = (schema) => async (req, res, next) => {
  const form = formidable({
    keepExtensions: true,
  });

  const formFields: any = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return customError(`${err}`, res);
      }

      resolve({ fields, files });
    });
  });

  const data = {
    ...formFields.fields,
    ...formFields.files,
  };

  Object.keys(data).forEach((key) => {
    if ({}.hasOwnProperty.call(data, key)) {
      try {
        // Convert strings to Json objects
        data[key] = JSON.parse(data[key]);
      } catch (e) {
        // continue regardless of error
      }
    }
  });

  // Validate form fields
  const result = schema.validate(data);

  const file = pathOr(null, ["files", "file"], formFields);

  if (result.error) {
    if (file) {
      // Delete file
      fs.unlinkSync(file.path);
    }

    return internalErrorHandle(
      pathOr("Unknown error.", ["error", "details", 0, "message"], result),
      res
    );
  }

  // Assign values to request body
  req.body = data;
  next();
};
