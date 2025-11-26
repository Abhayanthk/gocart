const prisma = require("../../../prisma/prisma");


// get Dashboard data for the admin
// (total Orders. total storesDummyData, total ProductDescription, total revenue)

async function getDashboardData(req, res) {
  try {
    const orders = await prisma.order.count();
    const stores = await prisma.store.count();
    // get all orders include only createdAt and total and calculate total revenue
    const allOrders = await prisma.order.findMany({
      select: {
        createdAt: true,
        total: true,
      },
    });
    const totalRevenue = allOrders.reduce((acc, order) => acc + order.total, 0);
    const revenue = totalRevenue.toFixed(2);
    // total products on app
    const products = await prisma.product.count();
    const dashboardData = {
      orders,
      stores,
      products,
      revenue,
      allOrders,
    };
    return res.status(200).json({ dashboardData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message
    });
  }
}
module.exports = { getDashboardData };