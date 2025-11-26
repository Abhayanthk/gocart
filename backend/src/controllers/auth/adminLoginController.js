const prisma = require("../../../prisma/prisma");
const { generateToken } = require("../../utilities/generateToken");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    if (!admin) {
      return res.status(404).json({ message: "email or password is incorrect" });
    }
    if (admin.password !== password) {
      return res.status(401).json({ message: "email or password is incorrect" });
    }

    const token = generateToken(admin, "admin");
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production if using HTTPS
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Admin logged in successfully",
      user: admin,
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = adminLogin;