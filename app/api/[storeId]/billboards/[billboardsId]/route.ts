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
  { params }: { params: { billboardsId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!userId) return new NextResponse("unAuthenticated", { status: 401 });
    if (!label) return new NextResponse("Label is Needed", { status: 400 });
    if (!imageUrl)
      return new NextResponse("No Image Provided", { status: 400 });
    if (!params.billboardsId)
      return new NextResponse("billBoardId Required", { status: 401 });
    const storeByuserId = await prismadb.billBoards.findFirst({
      where: {
        id: params.billboardsId,
      },
    });
    
    if (!storeByuserId) {
      return new NextResponse("You dont have the right permissions.", {
        status: 403,
      });
    }
    
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
    const { userId } = auth();
    console.log(params.storeId, params.billboardsId, "Here is the data");
    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    if (!params.billboardsId)
      return new NextResponse("billboardId Required", { status: 401 });
    if (!userId) return new NextResponse("Not Authenticated", { status: 401 });

    const storeByuserId = await prismadb.store.findFirst({
      where: {
        id: params.billboardsId,
        userId,
      },
    });
    console.log(storeByuserId, "Here is the data");

    if (!storeByuserId) {
      return new NextResponse("You dont have the right permissions.", {
        status: 403,
      });
    }

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
