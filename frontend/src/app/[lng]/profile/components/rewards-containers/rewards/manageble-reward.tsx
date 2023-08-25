"use client"

import { formatTitle } from "@/common/utils"
import { ManagebleReward } from "@/store/api/user/user-slice-api.types"
import { selectLocalCategories } from "@/store/store/features/category/category-slice"
import { useAppSelector } from "@/store/store/hooks/store-hooks"
import Image from "next/image"

type Props = {
  reward: ManagebleReward
}

export default function ManagebleRewardComponent({ reward }: Props) {
  const localCategories = useAppSelector(selectLocalCategories)
  const onClick = () => {}

  return (
    <div className="flex relative flex-col bg-cyan-400 bg-opacity-50 h-16 w-[calc(100%/10)] min-w-[50px] justify-center items-center rounded-md hover:cursor-pointer">
      <Image
        alt={reward.title}
        src={reward.image?.url_1x || reward.default_image.url_1x}
        width={26}
        height={26}
        className="rounded absolute top-0 mt-1"
      />
      <p className="absolute bottom-0 overflow-hidden text-xs text-center">
        {formatTitle(reward.title)}
      </p>
    </div>
  )
}
