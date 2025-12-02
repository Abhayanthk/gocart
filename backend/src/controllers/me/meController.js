const { verifyJwt } = require("../../utilities/verifyJWT");
const prisma = require("../../../prisma/prisma");

async function me(req, res) {
  try {
    let token = req.cookies?.admin_token;
    let role = "admin";

    if (!token) {
      token = req.cookies?.token;
      role = "user";
    }

    if (!token) {
      return res.status(401).json({ user: null });
    }

    const decoded = verifyJwt(token);
    if (!decoded) {
      return res.status(401).json({ user: null });
    }

    if (role === "admin") {
      const admin = await prisma.admin.findUnique({
        where: { email: decoded.email },
      });
      if (!admin) {
        return res.status(401).json({ user: null });
      }
    } else {
      const user = await prisma.user.findUnique({
        where: { email: decoded.email },
      });
      if (!user) {
        return res.status(401).json({ user: null });
      }
    }

    return res.status(200).json({ user: decoded });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message || error.code || "Internal server error",
    });
  }
}

module.exports = { me };
