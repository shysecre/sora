"use client"

import { reduxStore } from "@/store/store/store"
import { Provider } from "react-redux"

import { I18nextProvider } from "react-i18next"
import { ReactNode } from "react"
import initTranslations from "@/i18n"
import { Resource, createInstance } from "i18next"

export default function Providers({ children }: ProvidersProps) {
  return <Provider store={reduxStore}>{children}</Provider>
}

export function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationProviderProps) {
  const i18n = createInstance()

  initTranslations(locale, namespaces, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

type ProvidersProps = Readonly<{ children: React.ReactNode }>

type TranslationProviderProps = Readonly<{
  children: ReactNode
  locale: string
  namespaces: string[]
  resources: Resource
}>
