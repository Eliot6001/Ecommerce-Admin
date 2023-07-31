import React from "react";
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/colums";
import format from "date-fns/format";
import { formatter } from "@/lib/utils";
import ProductsClient from "./components/ProductsClient";
const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      Category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedProducts: ProductColumn[] = products.map(
    ({ id, name, createdAt, isFeatured, isArchived, price,
    Category, size, color }) => ({
      id,
      name,
      isFeatured,
      isArchived,
      price: formatter.format(price.toNumber()),
      Category: Category.name, 
      size: size.name, 
      color: color.value,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    })
  );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
