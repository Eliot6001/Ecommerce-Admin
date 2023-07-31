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
    const {
      name,
      price,
      sizeId,
      colorId,
      categoryId,
      images,
      isFeatured,
      isArchived  } = body;
    
    if (!params.storeId) return new NextResponse("StoreId Required", { status: 401 });

    verifyAuth(params.storeId);

    if (!name) return new NextResponse("name is Needed", { status: 400 });
    if (!price) return new NextResponse("No Price Provided", { status: 400 });
    if (!sizeId) return new NextResponse("Specify the size of the product", { status: 400 });
    if (!colorId) return new NextResponse("Specify the color of the product", { status: 400 });
    if (!categoryId) return new NextResponse("Specify the Category of the product", { status: 400 });
    
    
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        sizeId,
        colorId,
        categoryId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images:{
          createMany:{
            data:[
              ...images.map((image: {url: string}) => image)
            ]
          }
        }
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    const products = await prismadb.product.findMany({
        where:{
            storeId: params.storeId,
            categoryId,
            sizeId,
            colorId,
            isFeatured: isFeatured ? true : undefined,
            isArchived: false
        },
        include: {
          images: true,
          Category: true,
          size: true,
          color: true,
        },
        orderBy:{
          createdAt: "desc"
        }
    })
    return NextResponse.json(products)
  }
     catch (error) {
    console.log("[PRODUCTS.GET] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
