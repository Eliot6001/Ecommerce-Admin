import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    if(!userId) return new NextResponse("unAuthorized", { status: 401 });
    if( !name ) return new NextResponse("NameIsMissing", { status: 400 });
    const store = await prismadb.store.create({
        data:{
            name,
            userId
        }
    })
    return NextResponse.json(store);
} catch (error) {
    console.log("[STORE.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
