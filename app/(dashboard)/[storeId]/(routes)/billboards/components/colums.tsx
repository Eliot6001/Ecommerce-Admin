"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cellActions"

export type BillBoardsColumn = {
  id: string
  label: string
  createdAt: string

}

export const columns: ColumnDef<BillBoardsColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
