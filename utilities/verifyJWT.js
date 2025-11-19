import jwt from "jsonwebtoken";

export function verifyJwt(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null; // token invalid or expired
  }
}
