import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getUserData } from "@/utilities/getUserData";
import { NextResponse } from "next/server";

// Toggle Store IsActive
export async function POST(request) {
  try {
    const userData = await getUserData();
    const isAdmin = await authAdmin(userData.email);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {storeId} = await request.json();
    if(!storeId){
      return NextResponse.json({error:"StoreId is required"},{status:400})
    }
//     find the Store by StoreId
    const store = await prisma.store.updateUnique({
      where:{id:storeId},
    })
    if(!store){
      return NextResponse.json({error:"Store not found"},{status:404})
    }
    await prisma.store.updateUnique({
      where:{id:storeId},
      data:{isActive: !store.isActive}
    })
    return NextResponse.json({ message:"Store status updated successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 500 }
    );
  }
}
