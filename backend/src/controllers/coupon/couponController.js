const prisma = require("../../../prisma/prisma");

const verifyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase(), expiresAt: { gt: new Date() } },
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json({ coupon });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  verifyCoupon,
};
