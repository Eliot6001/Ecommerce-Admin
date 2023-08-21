"use client"
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'

import React from 'react'
import { ordersColumn, columns } from './colums'
import { DataTable } from '@/components/ui/dataTable'


interface OrdersClientProps {
  data: ordersColumn[]
}
const OrdersClient: React.FC<OrdersClientProps>
 = ({ data }) => {


  return (
    <>
      <Heading title={`Orders - ${data.length} -`} description="Manage Orders for your store"></Heading>
      <Separator />   
      <DataTable searchKey={'products'} columns={columns} data={data}/>
      </>
      )
}
 
export default OrdersClient