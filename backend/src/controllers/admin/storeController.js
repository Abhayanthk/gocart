const prisma = require("../../../prisma/prisma");

// Get all approved Stores
async function getApprovedStores(req, res) {
  try {
    const stores = await prisma.store.findMany({
      where: { status: "approved" },
      include: { user: true },
    });
    return res.status(200).json({ stores });
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      { error: error.code || error.message }
    );
  }
}
module.exports = { getApprovedStores };