import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


//////
//A function that verifies whether the user is signed in and owns Store 
//{ storeId } is the id in database
/////


export async function verifyAuth( storeId: string ){
    const { userId } = auth();
    if (!userId) return new NextResponse("unAuthenticated", { status: 401 });
    const storeByuserId = await prismadb.store.findFirst({
        where:{
            id: storeId,
            userId
        }
    })

    if(!storeByuserId) {
        return new NextResponse('You dont have the right permissions.', {status: 403})
    } 
}