"use client";

import CategoryDropdown from "@/app/profile/components/category-dropdown";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import {
  TwitchCategory,
  useGetCategoryMutation,
} from "@/store/api/category/category-slice-api";
import { selectSelectedCategories } from "@/store/store/features/category/category-slice";
import { useAppSelector } from "@/store/store/hooks/store-hooks";
import { useEffect, useState } from "react";

export default function CategorySearch() {
  const [getData] = useGetCategoryMutation();
  const [search, setSearch] = useSearchDebounce(250);
  const [categories, setCategories] = useState<TwitchCategory[]>([]);

  const selectedCategories = useAppSelector(selectSelectedCategories);

  useEffect(() => {
    async function fetchCategories(name: string) {
      if (!name.length) {
        setCategories([]);
      } else {
        const response = await getData({ name }).unwrap();

        setCategories(response.data);
      }
    }

    fetchCategories(search);
  }, [search, getData]);

  return (
    <div>
      <p className="text-center text-sm">Search category</p>
      {!!selectedCategories?.length && (
        <p className="text-center text-xs pb-2 opacity-50">
          You selected: {selectedCategories.map(({ id }) => id).join(", ")}
        </p>
      )}
      <div className="w-56 relative">
        <input
          className="bg-slate-400 w-full bg-opacity-40 border-none rounded-md focus:outline-none pl-2 text-sm h-8"
          onChange={(e) => setSearch(e.target.value)}
          spellCheck={false}
          placeholder="search..."
        />
        {!!categories?.length && <CategoryDropdown categories={categories} />}
      </div>
    </div>
  );
}
