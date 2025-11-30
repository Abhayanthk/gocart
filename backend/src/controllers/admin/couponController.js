const prisma = require("../../../prisma/prisma");

// Adding new coupon to db
async function addCoupon(req, res) {
  try {
    const { newCoupon } = req.body;
    newCoupon.code = newCoupon.code.toUpperCase();
    await prisma.coupon.create({
      data: newCoupon,
    });
    res.status(200).json({ message: "Coupon added successfully" });
  } catch (error) {
    console.log("Error from coupon Controller", error);
    res.status(500).json({ error: error.message || error.code });
  }
}

// Deleting coupon from db
async function deleteCoupon(req, res) {
  try {
    const { code } = req.params;
    await prisma.coupon.delete({
      where: {
        code: code,
      },
    });
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.log("Error from coupon Controller", error);
    res.status(500).json({ error: error.message || error.code });
  }
}

// get the list of coupons

async function getCoupons(req, res) {
  try {
    const coupons = await prisma.coupon.findMany();
    res.status(200).json({ coupons });
  } catch (error) {
    console.log("Error from coupon Controller", error);
    res.status(500).json({ error: error.message || error.code });
  }
}

module.exports = {
  addCoupon,
  deleteCoupon,
  getCoupons,
};
