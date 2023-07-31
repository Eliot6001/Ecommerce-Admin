"use client"
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SizeColumn, columns } from './colums'
import { DataTable } from '@/components/ui/dataTable'
import ApiList from '@/components/ui/apiList'


interface SizeClientProps {
  data: SizeColumn[]
}
const SizeClient: React.FC<SizeClientProps>
 = ({ data }) => {
  const router = useRouter();
  const params = useParams();


  return (
    <>
    <div className="flex items-center justify-between">
      <Heading title={`Size ${data.length}`} description="Manage Sizes for your store"></Heading>
      
      <Button onClick={() => router.push(`/${params.storeId}/sizes/new}`)}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
        </Button>   
      </div>
      <Separator />   
      <DataTable searchKey={'name'} columns={columns} data={data}/>
      <Heading title="API" description="API calls for Sizes" />
      <Separator/>
      <ApiList entityName='sizes' entityIdName='sizeId '/>
      </>
      )
}

export default SizeClient