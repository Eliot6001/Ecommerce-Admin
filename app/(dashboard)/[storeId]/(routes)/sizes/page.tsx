import React from "react";
import SizeClient from "./components/SizeClient";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/colums";
import format from "date-fns/format";
const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  const formattedSizes: SizeColumn[] = sizes.map(
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
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
