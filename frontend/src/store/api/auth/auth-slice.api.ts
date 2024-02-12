import { baseSliceApi } from "../base/base-slice.api"
import {
  AuthUserWithCodeOptions,
  AuthUserWithCodeResponse,
  GetAuthLinkOptions,
  GetAuthLinkResponse,
  VerifyTokenResponse,
} from "./auth-slice-api.types"

export const authSliceApi = baseSliceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthLink: builder.mutation<GetAuthLinkResponse, GetAuthLinkOptions>({
      query: ({ lng }) => ({ url: "/auth", method: "GET", params: { lng } }),
    }),
    authUserWithCode: builder.mutation<
      AuthUserWithCodeResponse,
      AuthUserWithCodeOptions
    >({
      query: ({ code }) => ({
        url: "/auth/success",
        method: "GET",
        params: { code },
      }),
    }),
    verifyToken: builder.mutation<VerifyTokenResponse, string>({
      query: (token) => ({
        url: "/auth/verify",
        method: "GET",
        params: { token },
      }),
    }),
  }),
})

export const {
  useAuthUserWithCodeMutation,
  useGetAuthLinkMutation,
  useVerifyTokenMutation,
} = authSliceApi
