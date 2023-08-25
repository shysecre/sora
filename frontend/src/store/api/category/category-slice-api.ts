import {
  CreateLocalCategoryOptions,
  CreateLocalCategoryResponse,
  GetCategoriesByQueryResponse,
} from "@/store/api/category/category-slice.types"
import { baseSliceApi } from "../base/base-slice.api"

export const categorySliceApi = baseSliceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesByQuery: builder.mutation<
      GetCategoriesByQueryResponse,
      string
    >({
      query: (name) => ({
        url: "/twitch/categories",
        method: "GET",
        params: { name },
      }),
    }),
    createCategory: builder.mutation<
      CreateLocalCategoryResponse[],
      CreateLocalCategoryOptions
    >({
      query: (body) => ({
        url: "/local/category",
        method: "POST",
        body,
      }),
    }),
    addRewardsToCategory: builder.mutation<
      void,
      { categoryId: string; rewards: string[] }
    >({
      query: (body) => ({
        url: "/local/category",
        method: "PATCH",
        body,
      }),
    }),
    getLocalCategories: builder.mutation<CreateLocalCategoryResponse[], void>({
      query: () => ({
        url: "/local/categories",
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetCategoriesByQueryMutation,
  useCreateCategoryMutation,
  useGetLocalCategoriesMutation,
  useAddRewardsToCategoryMutation,
} = categorySliceApi
