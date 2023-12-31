import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from './categoryForm'

const CategoryPage = async ({
    params
}: {params:{ categoryId: string, storeId: string }}) => {
    const Category = await prismadb.category.findUnique({
        where:{
            id: params.categoryId
        }
    })
    const billboards = await prismadb.billBoards.findMany({
      where:{
          storeId: params.storeId
      }
    })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={Category}/>
      </div>
    </div>
  )
}

export default CategoryPage