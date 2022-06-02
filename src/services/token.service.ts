import * as jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

/**
 * Generate JSON web token
 * @param id
 * @param email
 * @param role
 * @returns {*}
 */
export const generateJwt = (id, email, role) =>
  jwt.sign(
    {
      id,
      email,
      role,
    },
    secret
  );

/**
 * Verify JWT
 * @returns {*}
 * @param token
 */
export const verifyJwt = (token) => jwt.verify(token, secret);
