const prisma = require("../../../prisma/prisma");

const updateOrderStatus = async (req, res) => {
  try {
    const storeId = req.storeId;
    const { orderId, status } = req.body;
    await prisma.order.update({
      where: { id: orderId, storeId },
      data: { status },
    });
    return res
      .status(200)
      .json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || error.code });
  }
};

const getOrders = async (req, res) => {
  try {
    const storeId = req.storeId;
    const orders = await prisma.order.findMany({
      where: { storeId },
      include: {
        user: true,
        address: true,
        orderItems: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message || error.code });
  }
};

module.exports = { updateOrderStatus, getOrders };
