import bcypt from "bcryptjs";
import { generateToken } from "@/utilities/generateToken";
import { NextResponse } from "next/server";
const prisma = require("@/lib/prisma");

export async function POST(request) {
  try {
    const { username = "", email = "", password } = await request.json();
    // console.log("Login attempt with identifier:", identifier);
    if (!password) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }
    // console.log("Logging in user with identifier:", identifier);
    const user = await prisma.account.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User not found! Please signup first" },
        { status: 400 }
      );
    }
    const isPasswordValid = await bcypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password!" },
        { status: 400 }
      );
    }
    const token = generateToken(user);
    const response = NextResponse.json(
      { message: "Login success", user, token },
      { status: 201 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return response;
  } catch (err) {
    console.log(err, "error from the login route");
    return NextResponse.json(
      { message: err.message || err.code || "Internal server error" },
      { status: 500 }
    );
  }
}
