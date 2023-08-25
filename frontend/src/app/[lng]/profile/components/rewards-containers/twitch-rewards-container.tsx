"use client"

import LocalRewardComponent from "@/app/[lng]/profile/components/rewards-containers/rewards/local-reward"
import ManagebleRewardComponent from "@/app/[lng]/profile/components/rewards-containers/rewards/manageble-reward"
import TwitchRewardComponent from "@/app/[lng]/profile/components/rewards-containers/rewards/twitch-reward"
import Button from "@/components/ui/button"
import { useGetUserCustomRewardsMutation } from "@/store/api/user/user-slice-api"
import {
  LocalReward,
  ManagebleReward,
  TwitchReward,
} from "@/store/api/user/user-slice-api.types"
import {
  selectMixedReward,
  setMixedRewards,
} from "@/store/store/features/rewards/rewards-slice"
import { useAppDispatch, useAppSelector } from "@/store/store/hooks/store-hooks"
import { useEffect } from "react"

export default function TwitchRewardsContainer() {
  const [getUserCustomRewards, { isLoading }] =
    useGetUserCustomRewardsMutation()

  const mixedRewards = useAppSelector(selectMixedReward)
  const dispatch = useAppDispatch()

  const onRefresh = async () => {
    const response = await getUserCustomRewards().unwrap()

    dispatch(setMixedRewards(response.data))
  }

  useEffect(() => {
    const fetchInitialRewards = async () => {
      const response = await getUserCustomRewards().unwrap()

      dispatch(setMixedRewards(response.data))
    }

    fetchInitialRewards()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-w-[200px] w-[660px] max-w-[660px] min-h-[64px] max-h-[600px] h-auto prevent-select relative">
      <div className="flex gap-2 min-h-[64px] flex-wrap bg-less-dark p-2 rounded-lg">
        {!isLoading ? (
          mixedRewards.map((reward) => {
            if (reward.title === "test5") {
              console.log(reward)
            }

            switch (true) {
              case "isTwitchReward" in reward:
                return (
                  <TwitchRewardComponent
                    reward={reward as TwitchReward}
                    key={reward.id}
                  />
                )
              case "isManagebleReward" in reward:
                return (
                  <ManagebleRewardComponent
                    reward={reward as ManagebleReward}
                    key={reward.id}
                  />
                )
              case "isLocalReward" in reward:
                return (
                  <LocalRewardComponent
                    reward={reward as LocalReward}
                    key={reward.id}
                  />
                )
            }
          })
        ) : (
          <p className="text center text-4xl text-center">Loading rewards...</p>
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
