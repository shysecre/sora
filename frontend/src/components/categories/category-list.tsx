"use client"

import CategoryListItem from "@/components/categories/category-list-item"
import { useGetLocalCategoriesMutation } from "@/store/api/category/category-slice-api"
import {
  selectLocalCategories,
  setLocalCategories,
} from "@/store/store/features/category/category-slice"
import { useAppDispatch, useAppSelector } from "@/store/store/hooks/store-hooks"
import { useEffect } from "react"

export default function CategoriesList() {
  const [getLocalCategories] = useGetLocalCategoriesMutation()
  const dispatch = useAppDispatch()

  const categories = useAppSelector(selectLocalCategories)

  useEffect(() => {
    const getCategories = async () => {
      const response = await getLocalCategories().unwrap()

      dispatch(setLocalCategories(response))
    }

    getCategories()
  }, [])

  return (
    <div className="flex gap-12 justify-center items-center">
      {categories.map((category) => (
        <CategoryListItem key={category.id} category={category} />
      ))}
    </div>
  )
}
