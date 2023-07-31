"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cellActions"

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  color: string
  Category: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string

}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "isArchived",
  },
  {
    accessorKey: "isFeatured",
    header: "isFeatured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "Category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.color}}>

        </div>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    id: "actions",
    accessorKey:"Actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
