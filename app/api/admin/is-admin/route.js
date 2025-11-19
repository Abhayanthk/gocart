import authAdmin from "@/middlewares/authAdmin";
import { getUserData } from "@/utilities/getUserData";
import { NextResponse } from "next/server";

// Auth Amdin 
export async function GET(request){
      try{
            const userData = await getUserData();
            const isAdmin = await authAdmin(userData.email);
            if(!isAdmin){
                  return NextResponse.json({error:"Unauthorized"},{status:401})
            }
            return NextResponse.json({isAdmin},{status:200})
      }catch(err){
            console.log(err);
            return NextResponse.json({error: err.code || err.message },{status:400})
      }
}
