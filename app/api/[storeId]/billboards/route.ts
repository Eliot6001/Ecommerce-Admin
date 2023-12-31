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
    const { label, imageUrl } = body;
    if (!label) return new NextResponse("Label is Needed", { status: 400 });
    if (!imageUrl) return new NextResponse("No Image Provided", { status: 400 });
    if (!params.storeId) return new NextResponse("StoreId Required", { status: 401 });

    verifyAuth(params.storeId);

    const billboard = await prismadb.billBoards.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDs.POST] »» Post error", error);
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
    const billboards = await prismadb.billBoards.findMany({
        where:{
            storeId: params.storeId
        }
    })
    return NextResponse.json(billboards)
  }
     catch (error) {
    console.log("[BILLBOARDs.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
