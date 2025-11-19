// get Dashboard data for the sellers

import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getUserData } from "@/utilities/getUserData";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userData = await getUserData();
    const storeId = await authSeller(userData.id);
    // Get all orders for the sellers
    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
    });
    // get all prdoucts with rattings for seller
    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
    });
    const ratings = await prisma.rating.findMany({
      where: {
        productId: {
          in: products.map((product) => product.id),
        },
      },
      include: {
        product: true,
        user: true,
      },
    });
    const dashboardData = {
      orders,
      totalOrders: orders.length,
      totalEarnings: Math.round(
        orders.reduce((total, order) => total + order.totalAmount, 0)
      ),
      totalProducts: products.length,
      products,
      ratings,
    };
    return NextResponse.json({ dashboardData }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || err.code },
      { status: 500 }
    );
  }
}
