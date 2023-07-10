import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TwitchCategory } from "@/store/api/category/category-slice-api";
import { RootState } from "@/store/store/store";

interface CategoriesState {
  selectedCategories: TwitchCategory[];
  localCategories: TwitchCategory[]
}

const initialState = {
  selectedCategories: [],
  localCategories: []
} as CategoriesState;

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    onCategorySelect: (state, action: PayloadAction<TwitchCategory>) => {
      const isAlreadySelected = state.selectedCategories.some(
        ({ id }) => id === action.payload.id
      );

      if (isAlreadySelected) {
        state.selectedCategories = state.selectedCategories.filter(
          ({ id }) => id !== action.payload.id
        );
      } else {
        state.selectedCategories.push(action.payload);
      }
    },
  },
});

export const { onCategorySelect } = categoriesSlice.actions;

export const selectSelectedCategories = (state: RootState) =>
  state.categories.selectedCategories;

export default categoriesSlice.reducer;
