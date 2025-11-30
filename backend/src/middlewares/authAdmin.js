const { getUserData } = require("../utilities/getUserData");
const prisma = require("../../prisma/prisma");

const authAdmin = async (req, res, next) => {
  try {
    const userData = getUserData(req);

    // Check if getUserData returned an error object
    if (userData.status === 401 || !userData.id) {
      console.log("AuthAdmin: Invalid token or no token");
      return res.status(401).json({ message: "Unauthorized: No valid token" });
    }

    // Verify if the user exists in the Admin table
    const admin = await prisma.admin.findUnique({
      where: { id: userData.id.toString() },
    });

    if (!admin) {
      console.log("AuthAdmin: ID not found in Admin table:", userData.id);
      return res.status(403).json({ message: "Forbidden: Not an admin" });
    }

    // Attach admin data to request for use in controllers
    req.admin = admin;
    req.user = userData;
    next();
  } catch (err) {
    console.log("AuthAdmin Error:", err);
    return res.status(500).json({ error: err.code || err.message });
  }
};

module.exports = { authAdmin };
