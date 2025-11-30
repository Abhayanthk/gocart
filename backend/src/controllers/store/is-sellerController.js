const { authSeller } = require("../../middlewares/authSeller");
const { getUserData } = require("../../utilities/getUserData");
const prisma = require("../../../prisma/prisma");

// Auth Seller
async function isSeller(req, res) {
  try {
    const userData = await getUserData(req);
    const isSeller = await authSeller(userData.id.toString()); // check if the user is a seller

    if (!isSeller) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const storeInfo = await prisma.store.findUnique({
      where: { userId: userData.id.toString() },
    });
    return res.status(200).json({ storeInfo, isSeller });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message || err.code,
    });
  }
}

module.exports = { isSeller };
