import AuthSection from "@/components/root/auth-section"
import GuideIframe from "@/components/root/guide-iframe"
import TitleHeader from "@/components/root/title-header"
import initTranslations from "@/i18n"

import { TranslationsProvider } from "@/providers/providers"
import { LanguageProp } from "@/typings/props.typings"

const i18namespaces = ["root"]

export default async function Home({
  params: { lng },
}: Readonly<LanguageProp>) {
  const { t, resources } = await initTranslations(lng, i18namespaces)

  return (
    <TranslationsProvider
      locale={lng}
      namespaces={i18namespaces}
      resources={resources}
    >
      <div className="bg-dark-bg h-screen flex flex-col items-center justify-center gap-24">
        <TitleHeader t={t} />
        <AuthSection />
        <GuideIframe t={t} />
      </div>
    </TranslationsProvider>
  )
}
