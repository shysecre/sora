import { baseSliceApi } from "../base/base-slice.api";
import { GetUserCustomRewards, GetUserResponse } from "./user-slice-api.types";

export const userSliceApi = baseSliceApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation<GetUserResponse, unknown>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserCustomRewards: builder.mutation<GetUserCustomRewards, unknown>({
      query: () => ({
        url: "/user/custom-rewards",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserMutation, useGetUserCustomRewardsMutation } = userSliceApi;
