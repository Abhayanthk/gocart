import { verifyJwt } from "@/utilities/verifyJWT";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    const decoded = verifyJwt(token);
    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { user: null  },
      { status: 500 }
    );
  }
}
