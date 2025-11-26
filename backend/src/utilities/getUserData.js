const jwt = require("jsonwebtoken");

const getUserData = (req) => {
  const token = req.cookies?.token;
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
