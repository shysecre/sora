import { baseSliceApi } from "../base/base-slice.api";
import {
  AuthUserWithCodeOptions,
  AuthUserWithCodeResponse,
  GetAuthLinkResponse,
} from "./auth-slice-api.types";

export const authSliceApi = baseSliceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthLink: builder.mutation<GetAuthLinkResponse, unknown>({
      query: () => ({ url: "/auth", method: "GET" }),
    }),
    authUserWithCode: builder.mutation<AuthUserWithCodeResponse, AuthUserWithCodeOptions>({
      query: ({ code }) => ({ url: "/auth/success", method: "GET", params: { code } }),
    }),
  }),
});

export const { useAuthUserWithCodeMutation, useGetAuthLinkMutation } = authSliceApi;
