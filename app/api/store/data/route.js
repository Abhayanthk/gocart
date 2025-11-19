import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// get store info and store prducts
export async function GET(request) {
  try {
    const { searchParms } = new URL(request.url);
    const username = searchParms.get("username").toLowerCase();
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }
    // Get storeInfo and inStock products with rating
    const store = await prisma.store.findUnique({
      where: { username, isActive: true },
      include: {
        Product: {
          include: { rating: true },
        },
      },
    });
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }
    return NextResponse.json({ store }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || err.code },
      { status: 500 }
    );
  }
}
