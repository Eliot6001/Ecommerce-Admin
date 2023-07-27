import React from "react";
import BillBoardsClient from "./components/BillBoardsClient";
import prismadb from "@/lib/prismadb";
import { BillBoardsColumn } from "./components/colums";
import format from "date-fns/format";
const billboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billBoards.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillBoards: BillBoardsColumn[] = billboards.map(
    ({ id, label, createdAt }) => ({
      id,
      label,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  );
  return (
    <div className="flex-col">

      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardsClient data={formattedBillBoards} />
      </div>
    </div>
  );
};

export default billboardsPage;
