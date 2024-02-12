import { TFunction } from "i18next"

type Props = {
  t: TFunction
}

export default async function GuideIframe({ t }: Props) {
  return (
    <div className="w-[550px] h-[310px] p-0 m-0 text-center">
      <span>{t("guide_label")}</span>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/0iddi7DIxTo?si=IylziooAFOFnbUYy"
        title="YouTube video player"
        className="border-less-dark mb-10 border-2 rounded-xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
