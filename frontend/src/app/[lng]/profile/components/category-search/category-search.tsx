"use client"

import CategoryDropdown from "@/app/[lng]/profile/components/category-search/category-dropdown"
import CategoryDropdownElement from "@/app/[lng]/profile/components/category-search/category-dropdown-element"
import Button from "@/components/ui/button"
import useClientTranslation from "@/hooks/useClientTranslation"
import { useSearchDebounce } from "@/hooks/useSearchDebounce"
import {
  useCreateCategoryMutation,
  useGetCategoriesByQueryMutation,
  useGetLocalCategoriesMutation,
} from "@/store/api/category/category-slice-api"
import { TwitchCategory } from "@/store/api/category/category-slice.types"
import {
  clearSelectedCategories,
  selectSelectedCategories,
  setLocalCategories,
} from "@/store/store/features/category/category-slice"
import { useAppDispatch, useAppSelector } from "@/store/store/hooks/store-hooks"
import { useEffect, useRef, useState } from "react"

export default function CategorySearch() {
  const [getCategoriesByQuery] = useGetCategoriesByQueryMutation()
  const [getLocalCategories] = useGetLocalCategoriesMutation()
  const [createLocalCategories] = useCreateCategoryMutation()

  const ref = useRef<HTMLInputElement>(null)

  const [search, setSearch] = useSearchDebounce(250)
  const [categories, setCategories] = useState<TwitchCategory[]>([])
  const selectedCategories = useAppSelector(selectSelectedCategories)

  const dispatch = useAppDispatch()

  const [t] = useClientTranslation()

  const onCategoryCreate = async () => {
    await createLocalCategories({
      data: selectedCategories.map((cat) => ({
        twitchBoxImage: cat.box_art_url,
        twitchId: cat.id,
        twitchName: cat.name,
      })),
    })

    const response = await getLocalCategories().unwrap()

    dispatch(setLocalCategories(response))

    dispatch(clearSelectedCategories())

    if (!ref.current) return

    ref.current.value = ""
  }

  useEffect(() => {
    async function fetchCategories(name: string) {
      if (!name.length) {
        setCategories([])
      } else {
        const response = await getCategoriesByQuery(name).unwrap()

        setCategories(response.data)
      }
    }

    fetchCategories(search)
  }, [search, getCategoriesByQuery])

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="flex flex-col shrink-0 grow-0">
        <Button
          onClick={onCategoryCreate}
          className="bg-less-dark p-2 rounded-lg text-xs shrink-0 grow-0"
        >
          create
        </Button>

        {selectedCategories.map((selectedCategory) => (
          <CategoryDropdownElement
            key={selectedCategory.id}
            category={selectedCategory}
          />
        ))}
      </div>
      <div className="w-56 relative">
        <p className="text-center text-sm">
          {t("profile.search_category.input_label")}
        </p>
        <div>
          <input
            className="bg-slate-400 w-full bg-opacity-40 border-none rounded-md focus:outline-none pl-2 text-sm h-8"
            onChange={(e) => setSearch(e.target.value)}
            spellCheck={false}
            placeholder={t("profile.search_category.input_text")}
            ref={ref}
          />
          {!!categories?.length && <CategoryDropdown categories={categories} />}
        </div>
      </div>
    </div>
  )
}
