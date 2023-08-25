"use client"

import { cn } from "@/common/utils"
import Button from "@/components/ui/button"
import {
  useAddRewardsToCategoryMutation,
  useGetLocalCategoriesMutation,
} from "@/store/api/category/category-slice-api"
import { CreateLocalCategoryResponse } from "@/store/api/category/category-slice.types"
import { LocalReward } from "@/store/api/user/user-slice-api.types"
import { setLocalCategories } from "@/store/store/features/category/category-slice"
import { selectLocalTwitchRewards } from "@/store/store/features/rewards/rewards-slice"
import { useAppDispatch, useAppSelector } from "@/store/store/hooks/store-hooks"
import { useState } from "react"

type Props = {
  category: CreateLocalCategoryResponse
}

export default function RewardsDropdown({ category }: Props) {
  const [addRewardsToCategory] = useAddRewardsToCategoryMutation()
  const [getLocalCategories] = useGetLocalCategoriesMutation()

  const dispatch = useAppDispatch()

  const localRewards = useAppSelector(selectLocalTwitchRewards)
  const preselectedRewards = localRewards
    .filter((reward) =>
      category.items.some((item) => item.twitch_reward_id === reward.id)
    )
    .map((i) => i.local_id)

  const [selectedRewards, setSelectedRewards] = useState(preselectedRewards)

  const onRewardClick = (reward: LocalReward) => {
    const alreadySelected = selectedRewards.some((i) => i === reward.local_id)

    if (alreadySelected) {
      setSelectedRewards(selectedRewards.filter((i) => i !== reward.local_id))
    } else {
      setSelectedRewards(selectedRewards.concat([reward.local_id]))
    }
  }

  const onUpdate = async () => {
    const formatedData = {
      categoryId: category.id,
      rewards: selectedRewards,
    }

    await addRewardsToCategory(formatedData).unwrap()

    const response = await getLocalCategories().unwrap()

    dispatch(setLocalCategories(response))
  }

  return (
    <div className="rounded-lg ml-[60px] pt-2 pb-2 text-sm absolute w-[200px] z-10 bg-less-dark flex flex-col border-white border-[2px]">
      {localRewards.map((localReward) => (
        <div className="flex gap-2" key={localReward.id}>
          <input
            className="ml-2"
            type="checkbox"
            checked={selectedRewards.some((i) => i === localReward.local_id)}
            readOnly
          />
          <p
            className="w-max border-b-[1px] border-white cursor-pointer"
            onClick={() => onRewardClick(localReward)}
          >
            {localReward.title}
          </p>
        </div>
      ))}
      <Button
        onClick={onUpdate}
        className={cn("mt-2 border-white border-t-[2px] pt-2")}
      >
        update
      </Button>
    </div>
  )
}
