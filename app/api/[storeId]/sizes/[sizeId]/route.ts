import { verifyAuth } from "@/app/api/(functions)/verifyAuth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId)
      return new NextResponse("sizeId Required", { status: 401 });

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[CATEGORIES.FIND] ", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {
    const body = await req.json();
    const { name, value } = body;
    if (!name) return new NextResponse("name is Needed", { status: 400 });
    if (!value)
      return new NextResponse("No value Provided", { status: 400 });
    if (!params.sizeId)
      return new NextResponse("sizeId Required", { status: 401 });
    
    verifyAuth(params.storeId);
    
    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[size.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, sizeId: string } }
) {
  try {

    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    if (!params.sizeId)
      return new NextResponse("sizeId Required", { status: 401 });

    verifyAuth(params.storeId);
   
    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[size.DELETE] »» DELETE error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
