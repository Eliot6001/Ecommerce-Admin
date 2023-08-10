"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ordersColumn = {
  id: string
  phone: string
  address: string
  totalPrice: string
  products: string
  isPaid: boolean
  createdAt: string
}

export const columns: ColumnDef<ordersColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },{
    accessorKey: "phone",
    header: "Phone",
  },{
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
]
