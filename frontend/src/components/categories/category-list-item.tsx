"use client"

import CategoryListItemRewardsInfo from "@/components/categories/category-list-item-rewards-info"
import { CreateLocalCategoryResponse } from "@/store/api/category/category-slice.types"
import { selectLocalTwitchRewards } from "@/store/store/features/rewards/rewards-slice"
import { useAppSelector } from "@/store/store/hooks/store-hooks"
import Image from "next/image"

type Props = {
  category: CreateLocalCategoryResponse
}

export default function CategoryListItem({ category }: Readonly<Props>) {
  const availableRewards = useAppSelector(selectLocalTwitchRewards).length

  return (
    <div className="flex flex-col justify-center items-center">
      <CategoryListItemRewardsInfo
        assignedRewards={category.items.length}
        availableRewards={availableRewards}
      />
      <Image
        src={category.twitch_box_image}
        width="80"
        height="100"
        alt={category.twitch_name}
        className="rounded-t-[10px] cursor-pointer"
        quality={100}
      />
      <span>{category.twitch_name}</span>
    </div>
  )
}
