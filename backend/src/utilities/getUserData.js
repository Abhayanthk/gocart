const jwt = require("jsonwebtoken");

const getUserData = (req, cookieName = "token") => {
  const token = req.cookies?.[cookieName];
  if (!token) {
    return { message: "Unauthorized", status: 401 };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (err) {
    console.log(err);
    return { message: "Unauthorized", status: 401 };
  }
};

module.exports = { getUserData };
