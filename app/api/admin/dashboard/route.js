import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getUserData } from "@/utilities/getUserData";
import { NextResponse } from "next/server";

// get Dashboard data for the admin
// (total Orders. total storesDummyData, total ProductDescription, total revenue)

export async function GET(request) {
  try {
    const userData = await getUserData();
    const isAdmin = await authAdmin(userData.email);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const orders = await prisma.order.count();
    const stores = await prisma.store.count();
    // get all orders include only createdAt adn tota and caluate total revenue
    const allOrders = await prisma.order.findMany({
      select: {
        createdAt: true,
        total: true,
      },
    });
    const totalRevenue = allOrders.reduce((acc, order) => acc + order.total, 0);
    const revenue = totalRevenue.toFixed(2);
    // total products on app
    const products = await prisma.product.count();
    const dashboardData = {
      orders,
      stores,
      products,
      revenue,
      allOrders,
    };
    return NextResponse.json({ dashboardData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 500 }
    );
  }
}
