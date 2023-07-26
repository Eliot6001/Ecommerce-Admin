import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!userId) return new NextResponse("unAuthenticated", { status: 401 });
    if (!label) return new NextResponse("Label is Needed", { status: 400 });
    if (!imageUrl)
      return new NextResponse("No Image Provided", { status: 400 });
    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });

    const storeByuserId = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    })

    if(!storeByuserId) {
        return new NextResponse('You dont have the right permissions.', {status: 403})
    } 
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
