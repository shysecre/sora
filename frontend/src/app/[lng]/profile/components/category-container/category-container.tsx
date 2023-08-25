"use client"

import CategoryElement from "@/app/[lng]/profile/components/category-container/category-element"
import Button from "@/components/ui/button"
import { useGetLocalCategoriesMutation } from "@/store/api/category/category-slice-api"
import {
  selectLocalCategories,
  setLocalCategories,
} from "@/store/store/features/category/category-slice"
import { useAppDispatch, useAppSelector } from "@/store/store/hooks/store-hooks"
import { useEffect } from "react"

export default function CategoryContainer() {
  const [getLocalCategories, { isLoading }] = useGetLocalCategoriesMutation()
  const localCategories = useAppSelector(selectLocalCategories)

  const dispatch = useAppDispatch()

  const onRefresh = async () => {
    const response = await getLocalCategories().unwrap()

    dispatch(setLocalCategories(response))
  }

  useEffect(() => {
    async function fetchLocalCategories() {
      const response = await getLocalCategories().unwrap()

      dispatch(setLocalCategories(response))
    }

    fetchLocalCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-w-[200px] w-[660px] max-w-[660px] min-h-[64px] max-h-[600px] h-auto prevent-select">
      <div className="flex gap-2 min-h-[64px] flex-wrap bg-less-dark p-2 rounded-lg relative">
        {isLoading ? (
          <p>Loading categories...</p>
        ) : (
          localCategories.map((category) => (
            <CategoryElement key={category.id} category={category} />
          ))
        )}
      </div>
      <div className="m-0 flex justify-center items-center bottom-0 text-center h-[50px]">
        <Button
          className="m-2 h-6 bg-less-dark p-4 rounded-lg"
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </div>
    </div>
  )
}
