import { serverTranslation } from "@/i18n/server"
import Image from "next/image"

type Props = {
  lng: string
}

export default async function TitleHeader({ lng }: Props) {
  const { t } = await serverTranslation(lng)

  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <Image
        src={
          "https://i.pinimg.com/564x/73/4b/a7/734ba7705dabdd4c8f82c277f7360e4d.jpg"
        }
        alt="Sora"
        width={400}
        height={100}
        priority={true}
        className="rounded-[10px] mb-2"
      />
      <span className="text-6xl">SORA</span>
      <span>{t("root.page_header")}</span>
    </div>
  )
}
