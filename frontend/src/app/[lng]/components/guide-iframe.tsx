import { serverTranslation } from "@/i18n/server"

type Props = {
  lng: string
}

export default async function GuideIframe({ lng }: Props) {
  const { t } = await serverTranslation(lng)

  return (
    <div className="text-center">
      <span>{t("root.guide_label")}</span>
      <iframe
        width="550"
        height="310"
        src="https://www.youtube.com/embed/WGr2QOy0ps8"
        title="YouTube video player"
        className="border-less-dark mb-10 border-2 rounded-xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  )
}
