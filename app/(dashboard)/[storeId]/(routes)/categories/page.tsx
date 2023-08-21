import React from "react";
import CategoryClient from "./components/categoryClient";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/colums";
import format from "date-fns/format";
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include:{
      billboard:true
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedCategories: CategoryColumn[] = categories.map(
    ({ id, name, createdAt, billboard }) => ({
      id,
      name,
      billboardLabel: billboard.label,
      createdAt: format(createdAt, 'MMMM do, yyyy'),
    })
  ); 
  return (
    <div className="flex-col">

      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
