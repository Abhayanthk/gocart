const prisma = require("../../../prisma/prisma");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verifyStripePayment = async (req, res) => {
  try {
    const body = req.body;
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    const handlePaymentIntentSucceeded = async (paymentIntentId, isPaid) => {
      const session = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const { orderIds, userId, appId } = session.data[0].metadata;

      if (appId != "gocart") {
        return res
          .status(400)
          .json({ received: true, message: "Invalid app id" });
      }
      const orderIdsArray = orderIds.split(",");
      if (isPaid) {
        // mark order as paid
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            await prisma.order.update({
              where: { id: orderId },
              data: { isPaid: true },
            });
          })
        );
        // delete cart from user
        await prisma.user.update({
          where: { id: userId },
          data: { cart: {} },
        });
      } else {
        // delete order from database
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            await prisma.order.delete({
              where: { id: orderId },
            });
          })
        );
      }
    };
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object.id, true);
        break;
      case "payment_intent.canceled":
        await handlePaymentIntentSucceeded(event.data.object.id, false);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
    return res.json({ received: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.code || error.message });
  }
};

module.exports = { verifyStripePayment };
