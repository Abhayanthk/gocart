import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getUserData } from "@/utilities/getUserData";
import { NextResponse } from "next/server";

// Get all approved Stores
export async function GET(request) {
  try {
    const userData = await getUserData();
    const isAdmin = await authAdmin(userData.email);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const stores = await prisma.store.findMany({
      where: { status: "approved" },
      include: { user: true },
    });
    return NextResponse.json({ stores }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 500 }
    );
  }
}
