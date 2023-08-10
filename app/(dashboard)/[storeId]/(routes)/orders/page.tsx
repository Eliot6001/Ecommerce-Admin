import React from "react";
import OrdersClient from "./components/OrdersClient";
import prismadb from "@/lib/prismadb";
import { ordersColumn } from "./components/colums";
import format from "date-fns/format";
import { formatter } from "@/lib/utils";
const ordersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include:{
      orderItems:{
        include:{
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedOrders: ordersColumn[] = orders.map(
    ({ id, phone,address,orderItems, createdAt, isPaid }) => ({
      id,
      phone,
      address,
      products: orderItems.map(item => item.product.name).join(', '),
      totalPrice: formatter.format(orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      },0 )),
      isPaid,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  console.log(formattedOrders, "Orders are here")
  return (
    <div className="flex-col">

      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default ordersPage;
