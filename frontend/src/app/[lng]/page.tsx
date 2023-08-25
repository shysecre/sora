import AuthSection from "@/app/[lng]/components/auth-section"
import GuideIframe from "@/app/[lng]/components/guide-iframe"
import TitleHeader from "@/app/[lng]/components/title-header"

type Props = {
  params: {
    lng: string
  }
}

export default function Home({ params: { lng } }: Props) {
  return (
    <div className="bg-dark-bg flex gap-24 items-center flex-col justify-center">
      <TitleHeader lng={lng} />
      <AuthSection lng={lng} />
      <GuideIframe lng={lng} />
    </div>
  )
}
