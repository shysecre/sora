import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseSliceApi } from "../api/base/base-slice.api";
import userSlice from "./features/user/user-slice";
import categoriesSlice from "./features/category/category-slice";

const rootReducer = combineReducers({
  user: userSlice,
  categories: categoriesSlice,
  [baseSliceApi.reducerPath]: baseSliceApi.reducer,
});

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseSliceApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof reduxStore.dispatch;
