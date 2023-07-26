"use client"
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BillBoards } from '@prisma/client'


interface BillBoardsClientProps {
  data: BillBoards[]
}
const BillBoardsClient: React.FC<BillBoardsClientProps>
 = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  
  return (
    <>
    <div className="flex items-center justify-between">
      <Heading title={`Billboard ${data.length}`} description="Manage billboards for your store"></Heading>
      
      <Button onClick={() => router.push(`/${params.storeId}/billboards/new}`)}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
        </Button>   
      </div>
      <Separator />   
</>
      )
}

export default BillBoardsClient