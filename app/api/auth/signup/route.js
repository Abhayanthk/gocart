import bcypt from "bcryptjs";
import { generateToken } from "@/auth/utilities/generateToken";
import { NextResponse } from "next/server";
const prisma = require("@/lib/prisma");

export async function POST(request) {
  const { name, email, password, fullName = "TEMP" } = await request.json();
  if (!name || !email || !password || !fullName) {
    return NextResponse.json(
      { message: "Please provide all required fields" },
      { status: 400 }
    );
  }
  const existingUser = await prisma.account.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
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
  return NextResponse.json({ user, token }, { status: 201 });
};