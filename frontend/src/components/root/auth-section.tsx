"use client"

import Button from "@/components/ui/button"
import TwitchImage from "@/../public/twitch.png"
import { useGetAuthLinkMutation } from "@/store/api/auth/auth-slice.api"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

export default function AuthSection() {
  const router = useRouter()
  const [getAuthLink] = useGetAuthLinkMutation()

  const { t, i18n } = useTranslation()

  const getAuthUrl = async () => {
    const data = await getAuthLink({ lng: i18n.language }).unwrap()

    if (!data.link || !data.state) return

    localStorage.setItem("authState", data.state)
    router.replace(data.link)
  }

  return (
    <Button
      onClick={getAuthUrl}
      className="h-10"
      icon={{
        src: TwitchImage,
        height: 30,
        width: 30,
      }}
    >
      {t("auth_button_text")}
    </Button>
  )
}
