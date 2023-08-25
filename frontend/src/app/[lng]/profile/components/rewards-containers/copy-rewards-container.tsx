"use client"

import TwitchRewardComponent from "@/app/[lng]/profile/components/rewards-containers/rewards/twitch-reward"
import Button from "@/components/ui/button"
import { useCreateLocalRewardsMutation } from "@/store/api/rewards/rewards-slice-api"
import { useGetUserCustomRewardsMutation } from "@/store/api/user/user-slice-api"
import {
  clearCopyRewards,
  selectCopyRewards,
  setMixedRewards,
} from "@/store/store/features/rewards/rewards-slice"
import { useAppDispatch, useAppSelector } from "@/store/store/hooks/store-hooks"
import { useEffect } from "react"

export default function CopyRewardsContainer() {
  const [createLocalRewards, { error, isError, reset }] =
    useCreateLocalRewardsMutation()
  const [getUserCustomRewards] = useGetUserCustomRewardsMutation()
  const copyRewards = useAppSelector(selectCopyRewards)
  const dispatch = useAppDispatch()

  const onCopy = () => {
    const items = copyRewards.map((reward) => ({
      twitchName: reward.title,
      twitchCost: reward.cost,
      twitchBackgroundColor: reward.background_color,
      twitchPrompt: reward.prompt,
    }))

    createLocalRewards({ items })
      .unwrap()
      .then((res) => {
        getUserCustomRewards()
          .unwrap()
          .then((res) => {
            dispatch(clearCopyRewards())
            dispatch(setMixedRewards(res.data))
          })
      })
  }

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      reset()

      clearTimeout(timeoutId)
    }, 5000)
  }, [error, reset])

  return copyRewards.length ? (
    <div className="max-w-[660px]">
      {isError ? (
        <div className="flex justify-center items-center bg-red-500 rounded mb-2">
          <div>{(error as any).data.message}</div>
        </div>
      ) : null}
      <div className="flex gap-2 p-2 prevent-select bg-less-dark rounded-lg">
        {copyRewards.map((reward) => (
          <TwitchRewardComponent reward={reward} key={reward.id} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Button
          className="m-2 h-6 bg-less-dark p-4 rounded-lg"
          onClick={onCopy}
        >
          Copy selected rewards
        </Button>
      </div>
    </div>
  ) : null
}
