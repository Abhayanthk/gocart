
const prisma = require("../../../prisma/prisma");

// get store info and store prducts
 async function getStoreData(req, res) {
  try {
    const username = req.query.username?.toLowerCase();
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    // Get storeInfo and inStock products with rating
    const store = await prisma.store.findUnique({
      where: { username, isActive: true },
      include: {
        Product: {
          include: { rating: true },
        },
      },
    });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    return res.status(200).json({ store });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message || err.code,
    });
  }
}

module.exports = {
    getStoreData
};
