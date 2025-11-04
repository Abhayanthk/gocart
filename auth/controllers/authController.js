import bcypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utilities/generateToken.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { name, email, password, fullName = "TEMP" } = req.body;
  if (!name || !email || !password || !fullName) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  const existingUser = await prisma.account.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcypt.hash(password, 10);
  // console.log("Creating user:", {name, email, fullName, password: hashedPassword});
  const user = await prisma.account.create({
    data: {
      username: name,
      email,
      password: hashedPassword,
      fullName,
    },
  });
  const token = generateToken(user);
  return res.status(201).json({ user, token });
};

export const login = async (req, res) => {
  const { username = "", email = "", password } = req.body;
  // console.log("Login attempt with identifier:", identifier);
  if (!password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  // console.log("Logging in user with identifier:", identifier);
  const user = await prisma.account.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isPasswordValid = await bcypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  return res.status(200).json({ user, token });
};

// Generate profile endpoint
export const getProfile = async (req, res) => {
  const user = await prisma.account.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
  });
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.account.delete({ where: { id: decoded.id } });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
        console.error("🔥 Logout Server Error:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.code === "P2025") {
      return res.status(400).json({ message: "User already logged out" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};
