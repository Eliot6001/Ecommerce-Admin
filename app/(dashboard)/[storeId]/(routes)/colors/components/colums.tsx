"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cellActions"

export type ColorsColumn = {
  id: string
  name: string
  value: string
  createdAt: string

}

export const columns: ColumnDef<ColorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.value}}>

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
