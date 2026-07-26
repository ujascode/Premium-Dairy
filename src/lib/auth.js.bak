import jwt from 'jsonwebtoken';

/**
 * Sign a JSON Web Token
 * @param {Object} payload - The payload to sign
 * @returns {string} Signed JWT
 */
export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

/**
 * Verify a JSON Web Token
 * @param {string} token - The JWT to verify
 * @returns {object} Decoded payload
 * @throws {JsonWebTokenError} If the token is invalid
 */
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}