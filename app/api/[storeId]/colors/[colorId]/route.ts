import { verifyAuth } from "@/app/api/(functions)/verifyAuth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId)
      return new NextResponse("colorId Required", { status: 401 });

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[CATEGORIES.FIND] ", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    const body = await req.json();
    const { name, value } = body;
    if (!name) return new NextResponse("name is Needed", { status: 400 });
    if (!value)
      return new NextResponse("No value Provided", { status: 400 });
    if (!params.colorId)
      return new NextResponse("colorId Required", { status: 401 });
    
    verifyAuth(params.storeId);
    
    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[color.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    console.log(params.colorId, "colorId received")
    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    if (!params.colorId)
      return new NextResponse("colorId Required", { status: 401 });

    verifyAuth(params.storeId);
   
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[color.DELETE] »» DELETE error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
