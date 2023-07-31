import { verifyAuth } from "@/app/api/(functions)/verifyAuth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId)
      return new NextResponse("categoryId Required", { status: 401 });

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES.FIND] ", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string , categoryId: string } }
) {
  try {
    const body = await req.json();
    const { name, billboardId } = body;
    if (!name) return new NextResponse("name is Needed", { status: 400 });
    if (!billboardId)
      return new NextResponse("No billboardId Provided", { status: 400 });
    if (!params.categoryId)
      return new NextResponse("categoryId Required", { status: 401 });

    verifyAuth(params.storeId);

    
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[category.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    if (!params.categoryId)
      return new NextResponse("categoryId Required", { status: 401 });

    verifyAuth(params.storeId);

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[category.DELETE] »» DELETE error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
