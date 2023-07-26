import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
      try { 
          const { userId } = auth();
          const body = await req.json();
          console.log(body, "is the problem")
          const { name } = body;
          console.log("this is my req",name) //Body is not usable
          
  
          if(!userId) return new NextResponse("Sign in before making a request", {status:401})
          if (!name)  return new NextResponse("Name is Required!", {status:400})
          if(!params.storeId) return new NextResponse("store id is required", {status:400})
          const store = await prismadb.store.updateMany({
              where:{
                  id: params.storeId,
                  userId
              },
              data:{
                  name
              }
          })
          return NextResponse.json(store);
      } catch (error) {
          console.log('[STORE_PATCH]', error);
          return new NextResponse("Internal error", {status: 500})
      }
  }

export async function DELETE(
    req: Request, /*Needed even if not used */
    { params }: { params: { storeId: string } }
  ) {
      try {
          const { userId } = auth();  
  
          if(!userId) return new NextResponse("Sign in before making a request", {status:401})
          if(!params.storeId) return new NextResponse("store id is required", {status:400})
          const store = await prismadb.store.deleteMany({
              where:{
                  id: params.storeId,
                  userId
              }
          })
          return NextResponse.json(store);
      } catch (error) {
          console.log('[STORE_DELETE]', error);
          return new NextResponse("Internal error", {status: 500})
      }
  }
  