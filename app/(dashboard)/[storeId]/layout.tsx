import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar';

export default async function dashboardLayout({
    children,
    params
}: {
    children:React.ReactNode;
    params : {
        storeId:string;
    }
}){
    const { userId } = auth();
    if(!userId){ //if user not logged in sign in
        redirect('/sign-in');
    }
    const store = await prismadb.store.findFirst({ //if logged in straight up head to first store
        where:{
            id :params.storeId,
            userId
        }
    });
    if(!store) redirect('/'); //if no store created, head to root

    //lay out
    return(
        <>
            <Navbar/>
            {children}
        </>
    )
}
