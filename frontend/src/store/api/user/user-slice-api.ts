import { baseSliceApi } from "../base/base-slice.api";
import { GetUserCustomRewards, GetUserResponse } from "./user-slice-api.types";

export const userSliceApi = baseSliceApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation<GetUserResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserCustomRewards: builder.mutation<GetUserCustomRewards, void>({
      query: () => ({
        url: "/user/custom-rewards",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserMutation, useGetUserCustomRewardsMutation } = userSliceApi;
