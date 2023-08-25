import CategoryContainer from "@/app/[lng]/profile/components/category-container/category-container"
import CategorySearch from "@/app/[lng]/profile/components/category-search/category-search"
import CreateReward from "@/app/[lng]/profile/components/create-reward/create-reward"
import CopyRewardsContainer from "@/app/[lng]/profile/components/rewards-containers/copy-rewards-container"
import TwitchRewardsContainer from "@/app/[lng]/profile/components/rewards-containers/twitch-rewards-container"
import UserInfo from "@/app/[lng]/profile/components/user-info"
import { serverTranslation } from "@/i18n/server"

type Props = {
  params: {
    lng: string
  }
}

export default async function Profile({ params: { lng } }: Props) {
  const { t } = await serverTranslation(lng)

  return (
    <div className="bg-dark-bg h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="absolute top-0 pt-9 text-4xl">
        {t("profile.page_title")}
      </h1>
      <UserInfo />
      <CreateReward />
      <div className="w-full p-6 flex justify-between items-start">
        <div>
          <TwitchRewardsContainer />
          <CategoryContainer />
        </div>
        <div className="flex">
          <CategorySearch />
          <CopyRewardsContainer />
        </div>
      </div>
    </div>
  )
}
