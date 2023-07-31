import React from "react";
import SizeClient from "./components/ColorsClient";
import prismadb from "@/lib/prismadb";
import { ColorsColumn } from "./components/colums";
import format from "date-fns/format";
const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  const formattedColors: ColorsColumn[] = colors.map(
    ({ id, name, value, createdAt }) => ({
      id,
      name,
      value,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
