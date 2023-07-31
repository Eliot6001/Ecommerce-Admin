import { verifyAuth } from "@/app/api/(functions)/verifyAuth";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId)
      return new NextResponse("productId Required", { status: 401 });

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true, size: true, color: true, Category: true
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT.GET] ", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string, productId: string } }
) {
  try {
    const body = await req.json();
    const { 
      name,
      price,
      sizeId,
      colorId,
      categoryId,
      isFeatured,
      isArchived,
      images 
    } = body;

    if (!params.storeId) return new NextResponse("StoreId Required", { status: 401 });

    verifyAuth(params.storeId);

    if (!name) return new NextResponse("name is Needed", { status: 400 });
    if (!price) return new NextResponse("No Price Provided", { status: 400 });
    if (!sizeId) return new NextResponse("Specify the size of the product", { status: 400 });
    if (!colorId) return new NextResponse("Specify the color of the product", { status: 400 });
    if (!categoryId) return new NextResponse("Specify the Category of the product", { status: 400 });
    
   
    
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        sizeId,
        colorId,
        categoryId,
        isFeatured,
        isArchived,
        images:{
          deleteMany: {}
        }
      }
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
        data:{
          images:{
            createMany:{
              data:[
                ...images.map((image: {url: string}) => image)
              ]
            }
          }
        }
    })
    return NextResponse.json(product);

   
  } catch (error) {
    console.log("[product.POST] »» Post error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {

    if (!params.storeId)
      return new NextResponse("StoreId Required", { status: 401 });
    if (!params.productId)
      return new NextResponse("productId Required", { status: 401 });
   
    verifyAuth(params.storeId);
    

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS.DELETE] »» DELETE error", error);
    return new NextResponse("Internal Problem", { status: 500 });
  }
}
