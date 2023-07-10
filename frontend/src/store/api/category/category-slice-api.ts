import { baseSliceApi } from "../base/base-slice.api";

export const categorySliceApi = baseSliceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.mutation<
      { data: TwitchCategory[]; pagination: string },
      { name: string }
    >({
      query: (params) => ({
        url: "/twitch/category",
        method: "GET",
        params,
      }),
    }),
    createCategory: builder.mutation<
      unknown,
      { twitchName: string; twitchId: string; twitchBoxImage: string }
    >({
      query: (body) => ({
        url: "/local/category",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetCategoryMutation, useCreateCategoryMutation } =
  categorySliceApi;

export interface TwitchCategory {
  id: string;
  name: string;
  box_art_url: string;
}
