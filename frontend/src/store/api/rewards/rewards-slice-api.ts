import { url } from "inspector"
import { baseSliceApi } from "../base/base-slice.api"
import { CreateLocalRewardsOptions } from "@/store/api/rewards/rewards-slice.types"

export const rewardsSliceApi = baseSliceApi.injectEndpoints({
  endpoints: (builder) => ({
    createLocalRewards: builder.mutation<void, CreateLocalRewardsOptions>({
      query: (items) => ({
        url: "/local/item",
        method: "POST",
        body: items,
      }),
    }),
    addCategoriesToLocalRewards: builder.mutation<
      void,
      { categoryItems: { categoryItemId: string; categoryIds: string[] }[] }
    >({
      query: (data) => ({
        url: "/local/item",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
})

export const {
  useCreateLocalRewardsMutation,
  useAddCategoriesToLocalRewardsMutation,
} = rewardsSliceApi
