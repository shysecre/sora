import { formatTitle } from "@/common/utils"
import { TwitchReward } from "@/store/api/user/user-slice-api.types"
import { addOrRemoveCopyReward } from "@/store/store/features/rewards/rewards-slice"
import { useAppDispatch } from "@/store/store/hooks/store-hooks"
import Image from "next/image"

type Props = {
  reward: TwitchReward
}

export default function TwitchRewardComponent({ reward }: Props) {
  const dispatch = useAppDispatch()
  const onClick = (reward: TwitchReward) => {
    dispatch(addOrRemoveCopyReward(reward))
  }

  return (
    <div
      className="flex relative flex-col bg-purple-400 bg-opacity-50 h-16 w-[calc(100%/10)] min-w-[50px] justify-center items-center rounded-md hover:cursor-pointer"
      onClick={() => onClick(reward)}
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
  )
}
