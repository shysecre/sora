"use client"

import CategoryDropdownElement from "@/app/[lng]/profile/components/category-search/category-dropdown-element"
import { TwitchCategory } from "@/store/api/category/category-slice.types"

type Props = {
  categories: TwitchCategory[]
}

export default function CategoryDropdown({ categories }: Props) {
  return (
    <div className="absolute h-auto w-full flex flex-col gap-2 mt-2">
      {categories.map((category) => (
        <CategoryDropdownElement category={category} key={category.id} />
      ))}
    </div>
  )
}
