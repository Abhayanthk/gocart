const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const storeRoutes = require("./routes/store.js");
const authRoutes = require("./routes/auth.js");
const meRoutes = require("./routes/me.js");
const adminRoutes = require("./routes/admin.js");
const cookieParser = require("cookie-parser");
const { authAdmin } = require("./middlewares/authAdmin.js");
const { sellerMiddleware } = require("./middlewares/sellerMiddleware.js");
const productRoutes = require("./routes/products.js");
const cartRoutes = require("./routes/cart.js");
const addressRoutes = require("./routes/address.js");
const couponRoutes = require("./routes/coupon.js");
const ordersRoutes = require("./routes/orders.js");
const ratingRoutes = require("./routes/rating.js");
const stripeRoutes = require("./routes/stripe.js");

const app = express();
app.use(cookieParser());

dotenv.config();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:3000",
  process.env.NEXT_PUBLIC_URL, // Ensure this is set in your .env
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request Origin:", origin);
      console.log("Allowed Origins:", allowedOrigins);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Stripe webhook needs raw body
app.use("/stripe", express.raw({ type: "application/json" }), stripeRoutes);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/store", sellerMiddleware, storeRoutes);
app.use("/me", meRoutes);
app.use("/admin", authAdmin, adminRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/address", addressRoutes);
app.use("/coupon", couponRoutes);
app.use("/orders", ordersRoutes);
app.use("/rating", ratingRoutes);

app.get("/", (req, res) => {
  res.send("✅ Main Server is running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Main server running on port ${PORT}`));
