import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("✅ Auth Server is running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Auth server running on port ${PORT}`));
