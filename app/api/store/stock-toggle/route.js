import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getUserData } from "@/utilities/getUserData";
import { NextResponse } from "next/server";

// toggle stock of a product
export async function POST(request) {
  try {
    const userData = await getUserData();
    const { proudctId } = await request.json();
    if (!proudctId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }
    const storeId = await authSeller(userData.id);
    if (!storeId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const product = await prisma.product.findFirst({
      where: {id: proudctId, storeId}
    })
    if(!product){
      return NextResponse.json({error:"Product not found"}, {status:404});
    }
    await prisma.product.update({
      where: {id: proudctId},
      data: {inStock: !product.inStock}
    })
    return NextResponse.json({message:"Stock toggled successfully"}, {status:200});
    

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || err.code },
      { status: 500 }
    );
  }
}
