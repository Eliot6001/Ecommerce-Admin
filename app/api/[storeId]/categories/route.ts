import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { verifyAuth } from "../../(functions)/verifyAuth";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name, billboardId } = body;
    if (!name) return new NextResponse("Name is Needed", { status: 400 });
    if (!billboardId)
      return new NextResponse("Billboard not selected!", { status: 400 });
    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });

    verifyAuth(params.storeId);

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[Categories.POST] »» Post error", error);
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
    const categories = await prismadb.category.findMany({
        where:{
            storeId: params.storeId
        },
        include:{
          billboard:true
        }
    })
    return NextResponse.json(categories)
  }
     catch (error) {
    console.log("[Categories.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
