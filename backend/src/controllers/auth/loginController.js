const { generateToken } = require("../../utilities/generateToken");
const bcrypt = require("bcryptjs");
const prisma = require("../../../prisma/prisma");

async function login(req, res) {
  try {
    const { username = "", email = "", password } = req.body;
    // console.log("Login attempt with identifier:", identifier);
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    // console.log("Logging in user with identifier:", identifier);
    const user = await prisma.account.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found! Please signup first" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const token = generateToken(user);
    //     res.cookie("token", token, {
    //       httpOnly: true,
    //       // secure: true,
    //       secure: false,
    //       // sameSite: "strict",
    //       sameSite: "lax",
    //       path: "/",
    //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (milliseconds)
    //     });
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // true in production, false in dev
      sameSite: isProduction ? "none" : "lax", // "none" for cross-site (prod), "lax" for same-site (dev)
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login success",
      user,
      token,
    });
  } catch (err) {
    console.log(err, "error from the login route");
    return res
      .status(400)
      .json({ message: err.message || err.code || "Internal server error" });
  }
}
module.exports = { login };
