"use client";

import CategoryDropdownElement from "@/app/profile/components/category-dropdown-element";
import { TwitchCategory } from "@/store/api/category/category-slice-api";

type Props = {
  categories: TwitchCategory[];
};

export default function CategoryDropdown({ categories }: Props) {
  return (
    categories.length && (
      <div className="absolute h-auto w-full flex flex-col gap-2 mt-2">
        {categories.map((category) => (
          <CategoryDropdownElement category={category} key={category.id} />
        ))}
      </div>
    )
  );
}
