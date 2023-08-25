"use client"

import { cn } from "@/common/utils"
import Button from "@/components/ui/button"
import { useGetLocalCategoriesMutation } from "@/store/api/category/category-slice-api"
import { CreateLocalCategoryResponse } from "@/store/api/category/category-slice.types"
import { useAddCategoriesToLocalRewardsMutation } from "@/store/api/rewards/rewards-slice-api"
import { setLocalCategories } from "@/store/store/features/category/category-slice"
import { useAppDispatch } from "@/store/store/hooks/store-hooks"
import { useEffect, useState } from "react"

type Props = {
  categories: CreateLocalCategoryResponse[]
  localId: string
}

export default function CategoryDropdown({ categories, localId }: Props) {
  const preselectedCategories = categories
    .filter((category) =>
      category.items.some((reward) => reward.id === localId)
    )
    .map((category) => category.id)

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    preselectedCategories
  )
  const [updated, setUpdated] = useState(false)

  const [getLocalCategories] = useGetLocalCategoriesMutation()
  const [addCategoriesToLocalReward] = useAddCategoriesToLocalRewardsMutation()
  const dispatch = useAppDispatch()

  const onItemsClick = (category: CreateLocalCategoryResponse) => {
    const isInList = selectedCategories.some((item) => item === category.id)

    if (isInList) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category.id)
      )
    } else {
      setSelectedCategories(selectedCategories.concat([category.id]))
    }
  }

  const onUpdate = async () => {
    const formatedData = {
      categoryItems: [
        {
          categoryItemId: localId,
          categoryIds: selectedCategories,
        },
      ],
    }

    await addCategoriesToLocalReward(formatedData).unwrap()

    const response = await getLocalCategories().unwrap()

    dispatch(setLocalCategories(response))

    setUpdated(!updated)
  }

  useEffect(() => {
    if (!updated) return

    const delay = setTimeout(() => {
      setUpdated(!updated)
    }, 750)
    return () => clearTimeout(delay)
  }, [updated])

  return (
    <div className="rounded-lg ml-[68px] pt-2 pb-2 text-sm absolute w-[200px] z-10 bg-less-dark flex flex-col border-white border-[2px]">
      {categories.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            className="ml-2"
            type="checkbox"
            checked={selectedCategories.some(
              (category) => category === item.id
            )}
            readOnly
          />
          <p
            className="w-max border-b-[1px] border-white cursor-pointer"
            onClick={() => onItemsClick(item)}
            key={idx}
          >
            {item.twitch_name}
          </p>
        </div>
      ))}
      <Button
        onClick={onUpdate}
        className={cn("mt-2 border-white border-t-[2px] pt-2", {
          "text-green-400 drop-shadow-glow": updated,
        })}
      >
        update
      </Button>
    </div>
  )
}
