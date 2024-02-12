import CategoriesList from "@/components/categories/category-list"
import initTranslations from "@/i18n"
import { TranslationsProvider } from "@/providers/providers"
import { LanguageProp } from "@/typings/props.typings"

type Props = LanguageProp

const i18namespaces = ["categories"]

export default async function Categories({ params: { lng } }: Readonly<Props>) {
  const { resources } = await initTranslations(lng, i18namespaces)

  return (
    <TranslationsProvider
      namespaces={i18namespaces}
      locale={lng}
      resources={resources}
    >
      <CategoriesList />
    </TranslationsProvider>
  )
}
