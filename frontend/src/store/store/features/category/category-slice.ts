import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store/store/store"
import {
  CreateLocalCategoryResponse,
  TwitchCategory,
} from "@/store/api/category/category-slice.types"

interface CategoriesState {
  selectedCategories: TwitchCategory[]
  localCategories: CreateLocalCategoryResponse[]
}

const initialState = {
  selectedCategories: [],
  localCategories: [],
} as CategoriesState

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    onCategorySelect: (state, action: PayloadAction<TwitchCategory>) => {
      const isAlreadySelected = state.selectedCategories.some(
        ({ id }) => id === action.payload.id
      )

      if (isAlreadySelected) {
        state.selectedCategories = state.selectedCategories.filter(
          ({ id }) => id !== action.payload.id
        )
      } else {
        state.selectedCategories.push(action.payload)
      }
    },
    clearSelectedCategories: (state) => {
      state.selectedCategories = []
    },
    setLocalCategories: (
      state,
      action: PayloadAction<CreateLocalCategoryResponse[]>
    ) => {
      state.localCategories = action.payload
    },
  },
})

export const { onCategorySelect, setLocalCategories, clearSelectedCategories } =
  categoriesSlice.actions

export const selectSelectedCategories = (state: RootState) =>
  state.categories.selectedCategories

export const selectLocalCategories = (state: RootState) =>
  state.categories.localCategories

export default categoriesSlice.reducer
