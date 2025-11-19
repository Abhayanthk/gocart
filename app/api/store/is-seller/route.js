import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getUserData } from "@/utilities/getUserData";
import { NextResponse } from "next/server";

// Auth Seller
export async function GET(request) {
  try {
    const userData = await getUserData();
    const isSeller = await authSeller(userData.id); // check if the user is a seller

    if (!isSeller) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const storeInfo = await prisma.store.findUnique({
      where: { userId: userData.id },
    });
    return NextResponse.json({ storeInfo, isSeller }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || err.code },
      { status: 500 }
    );
  }
}
