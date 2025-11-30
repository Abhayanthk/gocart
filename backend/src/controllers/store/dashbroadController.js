// get Dashboard data for the sellers

const prisma = require("../../../prisma/prisma");

async function getDashboard(req, res) {
  try {
    const storeId = req.storeId;
    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
    });
    // get all products with ratings for seller
    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
    });
    const ratings = await prisma.rating.findMany({
      where: {
        productId: {
          in: products.map((product) => product.id),
        },
      },
      include: {
        product: true,
        user: true,
      },
    });
    const dashboardData = {
      orders,
      totalOrders: orders.length,
      totalEarnings: Math.round(
        orders.reduce((total, order) => total + order.total, 0)
      ),
      totalProducts: products.length,
      products,
      ratings,
    };
    return res.status(200).json({ dashboardData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message || err.code });
  }
}

module.exports = {
  getDashboard,
};
