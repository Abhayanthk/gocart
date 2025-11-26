
const jwt = require("jsonwebtoken");

function verifyJwt(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null; // token invalid or expired
  }
}

module.exports = { verifyJwt };
