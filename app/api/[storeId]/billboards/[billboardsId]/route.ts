import { verifyAuth } from "@/app/api/(functions)/verifyAuth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardsId: string } }
) {
  try {
    if (!params.billboardsId)
      return new NextResponse("billboardsId Required", { status: 401 });

    const billboards = await prismadb.billBoards.findUnique({
      where: {
        id: params.billboardsId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDs.FIND] ", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string, billboardsId: string } }
) {
  try {
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!label) return new NextResponse("Label is Needed", { status: 400 });
    if (!imageUrl)
      return new NextResponse("No Image Provided", { status: 400 });
    if (!params.billboardsId)
      return new NextResponse("billBoardId Required", { status: 401 });

    verifyAuth(params.storeId);
    
    const billboard = await prismadb.billBoards.updateMany({
      where: {
        id: params.billboardsId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDs.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardsId: string } }
) {
  try {

    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    if (!params.billboardsId)
      return new NextResponse("billboardId Required", { status: 401 });
   
    verifyAuth(params.storeId);
    

    const billboards = await prismadb.billBoards.deleteMany({
      where: {
        id: params.billboardsId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDs.DELETE] »» DELETE error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
