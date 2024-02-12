import AuthCompletion from "@/components/auth/auth-completion"
import initTranslations from "@/i18n"
import { LanguageProp } from "@/typings/props.typings"

type Props = {
  searchParams: {
    state: string
    code: string
  }
} & LanguageProp

const i18namespaces = ["auth"]

export default async function Auth({ searchParams, params }: Readonly<Props>) {
  const { t } = await initTranslations(params.lng, i18namespaces)

  return (
    <div className="bg-dark-bg h-screen w-screen flex justify-center items-center">
      <p className="text-6xl">{t("processing")}</p>
      <AuthCompletion {...searchParams} />
    </div>
  )
}
