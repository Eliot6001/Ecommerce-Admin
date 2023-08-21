"use client";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ColorsColumn, columns } from "./colums";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/apiList";

interface ColorClientProps {
  data: ColorsColumn[];
}
const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors - ${data.length} -`}
          description="Manage Colors for your store"
        ></Heading>
 
        <Button onClick={() => router.push(`/${params.storeId}/colors/new}`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId " />
    </>
  );
};

export default ColorClient;
