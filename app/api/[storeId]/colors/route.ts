import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { verifyAuth } from "../../(functions)/verifyAuth";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name, value } = body;
    if (!name) return new NextResponse("Name is Required", { status: 400 });
    if (!value)
      return new NextResponse("Value is required!", { status: 400 });
    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });

    verifyAuth(params.storeId)
    
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    const Color = await prismadb.color.findMany({
        where:{
            storeId: params.storeId
        }
    })
    return NextResponse.json(Color)
  }
     catch (error) {
    console.log("[COLORS.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
