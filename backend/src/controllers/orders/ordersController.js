const prisma = require("../../../prisma/prisma");
const { getUserData } = require("../../utilities/getUserData");

const createOrder = async (req, res) => {
  try {
    const userData = getUserData(req);
    if (!userData || userData.status === 401) {
      return res.status(401).json({ error: "Please login" });
    }
    const { addressId, items, couponCode, paymentMethod } =
      req.body.orderData || req.body;

    if (!addressId || !items || items.length === 0 || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let coupon = null;
    if (couponCode) {
      coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });
      if (!coupon) {
        return res.status(400).json({ error: "Coupon not found" });
      }
    }
    const orderByStore = new Map();
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });
      const storeId = product.storeId;
      if (!orderByStore.has(storeId)) {
        orderByStore.set(storeId, []);
      }
      orderByStore.get(storeId).push({ ...item, price: product.price });
    }
    let orderIds = [];
    let fullAmount = 0;
    let isShippingFeeAdded = false;

    //     creat ordres for each seller
    for (const [storeId, sellerItems] of orderByStore.entries()) {
      let total = sellerItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      if (coupon) {
        total -= (total * coupon.discount) / 100;
      }
      fullAmount += parseFloat(total.toFixed(2));
      const order = await prisma.order.create({
        data: {
          userId: userData.id.toString(),
          storeId,
          addressId,
          total: parseFloat(total.toFixed(2)),
          paymentMethod,
          isCouponUsed: coupon ? true : false,
          coupon: coupon ? coupon : {},
          orderItems: {
            create: sellerItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
      orderIds.push(order.id);
    }
    if (paymentMethod === "STRIPE") {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const origin = req.headers["origin"];
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Order",
              },
              unit_amount: Math.round(fullAmount * 100),
            },
            quantity: 1,
          },
        ],
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
        mode: "payment",
        success_url: `${origin}/loading?nextUrl=orders`,
        cancel_url: `${origin}/cart`,
        metadata: {
          orderIds: orderIds.join(","),
          userId: userData.id.toString(),
          appId: "gocart",
        },
      });
      return res.json({ session });
    }
    await prisma.user.update({
      where: { id: userData.id.toString() },
      data: {
        cart: {},
      },
    });
    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.code || error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userData = getUserData(req);
    if (!userData || userData.status === 401) {
      return res.status(401).json({ error: "Please login" });
    }
    const userId = userData.id.toString();
    const orders = await prisma.order.findMany({
      where: {
        userId,
        OR: [
          { paymentMethod: "COD" },
          {
            AND: [{ paymentMethod: "STRIPE" }, { isPaid: true }],
          },
        ],
      },
      include: {
        orderItems: { include: { product: true } },
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.code || error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
