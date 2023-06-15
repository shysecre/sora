import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseSliceApi } from "../api/base/base-slice.api";
import userSlice from "./features/user/user-slice";

const rootReducer = combineReducers({
  user: userSlice,
  [baseSliceApi.reducerPath]: baseSliceApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseSliceApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
