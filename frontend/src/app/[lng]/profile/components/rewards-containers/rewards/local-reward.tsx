"use client"

import CategoryDropdown from "@/app/[lng]/profile/components/dropdown/category-dropdown"
import { formatTitle } from "@/common/utils"
import { LocalReward } from "@/store/api/user/user-slice-api.types"
import { selectLocalCategories } from "@/store/store/features/category/category-slice"
import { useAppSelector } from "@/store/store/hooks/store-hooks"
import Image from "next/image"
import { useState } from "react"

type Props = {
  reward: LocalReward
}

export default function LocalRewardComponent({ reward }: Props) {
  const [isHidden, setIsHidden] = useState(true)
  const localCategories = useAppSelector(selectLocalCategories)

  const onLocalRewardClick = async () => {
    setIsHidden(!isHidden)
  }

  return (
    <div className="bg-lime-400 bg-opacity-50 h-16 w-[calc(100%/10)] min-w-[50px] rounded-md relative">
      <div
        className="h-[100%] flex flex-col justify-center items-center cursor-pointer"
        onClick={onLocalRewardClick}
      >
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
      {!isHidden && localCategories.length ? (
        <CategoryDropdown
          categories={localCategories}
          localId={reward.local_id}
        />
      ) : null}
    </div>
  )
}
