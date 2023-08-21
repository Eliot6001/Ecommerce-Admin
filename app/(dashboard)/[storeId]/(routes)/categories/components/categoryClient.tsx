"use client"
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CategoryColumn, columns } from './colums'
import { DataTable } from '@/components/ui/dataTable'
import ApiList from '@/components/ui/apiList'


interface CategoryClientProps {
  data: CategoryColumn[]
}
const CategoriesClient: React.FC<CategoryClientProps>
 = ({ data }) => {
  const router = useRouter();
  const params = useParams();
 

  return (
    <>
    <div className="flex items-center justify-between">
      <Heading title={`Category ${data.length}`} description="Manage categories for your store"></Heading>
      
      <Button onClick={() => router.push(`/${params.storeId}/categories/new}`)}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
        </Button>   
      </div>
      <Separator />   
      <DataTable searchKey={'name'} columns={columns} data={data}/>
      <Heading title="API" description="API calls for Categories" />
      <Separator/>
      <ApiList entityName='categories' entityIdName='categoryId '/>
      </>
      )
}

export default CategoriesClient