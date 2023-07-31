"use client"
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ProductColumn, columns } from './colums'
import { DataTable } from '@/components/ui/dataTable'
import ApiList from '@/components/ui/apiList'


interface ProductsClientProps {
  data: ProductColumn[]
}
const ProductsClient: React.FC<ProductsClientProps>
 = ({ data }) => {
  const router = useRouter();
  const params = useParams();


  return (
    <>
    <div className="flex items-center justify-between">
      <Heading title={`Products - ${data.length} -`} description="Manage products in your store"></Heading>
      
      <Button onClick={() => router.push(`/${params.storeId}/products/new}`)}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
        </Button>   
      </div>
      <Separator />   
      <DataTable searchKey={'label'} columns={columns} data={data}/>
      <Heading title="API" description="API calls for products" />
      <Separator/>
      <ApiList entityName='products' entityIdName='productId'/>
      </>
      )
}

export default ProductsClient