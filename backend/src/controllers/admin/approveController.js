const prisma = require("../../../prisma/prisma");

// Approve Seller
async function approve(req, res) {
  try {
    const { storeId, status } = req.body;
    if (status === "approved") {
      await prisma.store.update({
        where: { id: storeId },
        data: { status: "approved", isActive: true },
      });
    } else if (status === "rejected") {
      await prisma.store.update({
        where: { id: storeId },
        data: { status: "rejected" },
      });
    }
    return res.status(200).json({
      message: status + " successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
}

// Get all pending and Rejected Store
async function getPendingStores(req, res) {
  try {
    const stores = await prisma.store.findMany({
      where: { status: { in: ["pending", "rejected"] } },
      include: { user: true },
    });
    return res.status(200).json({ stores });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
}
module.exports = { approve, getPendingStores };
