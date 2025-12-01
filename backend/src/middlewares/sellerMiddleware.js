const { getUserData } = require("../utilities/getUserData");
const { authSeller } = require("./authSeller");

const sellerMiddleware = async (req, res, next) => {
  try {
    if (req.path === "/create" && req.method === "POST") {
      return next();
    }
    const userData = getUserData(req);
    if (!userData) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const storeInfo = await authSeller(userData.id.toString());
    if (!storeInfo) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const storeId = storeInfo?.id;
    if (!storeId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.storeId = storeId;
    req.storeInfo = storeInfo;
    req.userData = userData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || error.code });
  }
};
module.exports = { sellerMiddleware };
