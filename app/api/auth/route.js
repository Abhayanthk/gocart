import { NextResponse } from "next/server";

export async function GET(request) {
      console.log("Hello")
      return NextResponse.json({ message: "Hello" });
}