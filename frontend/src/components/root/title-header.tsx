import { TFunction } from "i18next"

type Props = {
  t: TFunction
}

export default async function TitleHeader({ t }: Props) {
  return (
    <div className="flex justify-center items-center flex-col">
      <span className="text-[128px] font-black">SORA</span>
      <span className="text-4xl">{t("page_header")}</span>
    </div>
  )
}
