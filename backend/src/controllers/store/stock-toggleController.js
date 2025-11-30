const prisma = require("../../../prisma/prisma");

// toggle stock of a product
async function toggleStock(req, res) {
  try {
    const storeId = req.storeId;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const product = await prisma.product.findFirst({
      where: { id: productId, storeId },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await prisma.product.update({
      where: { id: productId },
      data: { inStock: !product.inStock },
    });
    return res.status(200).json({ message: "Stock toggled successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message || err.code });
  }
}
module.exports = { toggleStock };
