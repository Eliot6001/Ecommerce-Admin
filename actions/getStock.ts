import prismadb from "@/lib/prismadb";

const stockCount = async (storeId: string) =>{
    const totalStock = await prismadb.product.count({
        where:{
            storeId,
            isArchived : false,
        },
    });
    
   return totalStock
}
export default stockCount