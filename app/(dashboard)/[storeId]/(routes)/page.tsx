import  getTotalRevuenue from "@/actions/getTotalRevenue";
import getSalesCount from "@/actions/getSalesCount";
import getStock from "@/actions/getStock";
import getGraphRevenue from "@/actions/getGraphRevenue";



import { Heading } from "@/components/ui/Heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package2Icon } from "lucide-react";
import React from "react";
import Overview from "../../components/overview";

async function DashboardPage({params}: {params: {storeId: string}}) {
  const totalRevenue = await getTotalRevuenue(params.storeId)
  const totalSales = await getSalesCount(params.storeId)
  const totalStock = await getStock(params.storeId)
  const graphRev = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-col ">
              <span className="w-full flex align-center items-center">
                <CardTitle>Total revenue</CardTitle>   
                  <DollarSign className="ml-auto h-4 w-4"/>    
              </span>
              <CardDescription>Your Earnings for this quarter</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
             {formatter.format(totalRevenue)}
            </CardContent>
            
          </Card>
          <Card>
            <CardHeader className="flex flex-col ">
              <span className="w-full flex align-center items-center">
                <CardTitle>Sales</CardTitle>   
                  <CreditCard className="ml-auto h-4 w-4"/>    
              </span>
              <CardDescription>Sales done in the past quarter</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
             + {totalSales}
            </CardContent>
            
          </Card>
         
          <Card>
            <CardHeader className="flex flex-col ">
              <span className="w-full flex align-center items-center">
                <CardTitle>Stock</CardTitle>   
                  <Package2Icon className="ml-auto h-4 w-4"/>    
              </span>
              <CardDescription>Your stock of products</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-bold flex items-center ">
             {totalStock} <p className="text-sm ml-2 font-light">items</p>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader className="flex flex-col ">
              <span className="w-full flex align-center items-center">
                <CardTitle>Overview</CardTitle>   
                  <Package2Icon className="ml-auto h-4 w-4"/>    
              </span>
              <CardDescription>an Overview on your store</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-bold flex items-center ">
             <Overview data={graphRev}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
