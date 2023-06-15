import { BaseQueryFn, QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { RefreshUserAccessTokenResponse } from "../auth/auth-slice-api.types";

if (!process.env.REACT_APP_API_URL) {
  throw new Error("Fill in REACT_APP_API_URL!");
}

const mutex = new Mutex();

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

const baseQueryWithRefreshToken = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("refreshToken");

    if (!token) return;

    headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

const baseQueryReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const newTokens = (await baseQueryWithRefreshToken(
          "auth/refresh",
          api,
          extraOptions
        )) as QueryReturnValue<
          RefreshUserAccessTokenResponse,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >;

        if (newTokens.data) {
          localStorage.setItem("accessToken", newTokens.data.accessToken);
          localStorage.setItem("refreshToken", newTokens.data.refreshToken);

          result = await baseQueryWithAuth(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();

      result = await baseQueryWithAuth(args, api, extraOptions);
    }
  }

  return result;
};

export const baseSliceApi = createApi({
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({}),
});
