const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const storeRoutes = require("./routes/store.js");
const authRoutes = require("./routes/auth.js");
const meRoutes = require("./routes/me.js");
const adminRoutes = require("./routes/admin.js");
const cookieParser = require("cookie-parser");
const { authAdmin } = require("./middlewares/authAdmin.js");

const app = express();
app.use(cookieParser());


dotenv.config();
app.use(express.json());
app.set("trust proxy", 1);
app.use(cors({
  origin: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/store", storeRoutes);
app.use("/me", meRoutes);
app.use("/admin", authAdmin, adminRoutes);

app.get("/", (req, res) => {
  res.send("✅ Main Server is running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Main server running on port ${PORT}`));
