import {
  LocalReward,
  MixedRewards,
  TwitchReward,
} from "@/store/api/user/user-slice-api.types"
import { RootState } from "@/store/store/store"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface RewardsState {
  mixedRewards: MixedRewards[]
  copyRewards: TwitchReward[]
}

const initialState = {
  mixedRewards: [],
  copyRewards: [],
} as RewardsState

export const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    addOrRemoveCopyReward: (store, action: PayloadAction<TwitchReward>) => {
      const isAlreadySelected = store.copyRewards.some(
        ({ id }) => id === action.payload.id
      )

      if (isAlreadySelected) {
        store.copyRewards = store.copyRewards.filter(
          ({ id }) => id !== action.payload.id
        )
      } else {
        store.copyRewards.push(action.payload)
      }
    },
    clearCopyRewards: (store) => {
      store.copyRewards = []
    },
    setMixedRewards: (store, action: PayloadAction<MixedRewards[]>) => {
      store.mixedRewards = action.payload
    },
    clearMixedRewards: (store) => {
      store.mixedRewards = []
    },
  },
})

export const {
  addOrRemoveCopyReward,
  clearCopyRewards,
  clearMixedRewards,
  setMixedRewards,
} = rewardsSlice.actions

export const selectTwitchRewards = (state: RootState) =>
  state.rewards.mixedRewards.filter((r) => "isTwitchReward" in r)

export const selectManagebleTwitchRewards = (state: RootState) =>
  state.rewards.mixedRewards.filter((r) => "isManagebleReward" in r)

export const selectLocalTwitchRewards = (state: RootState) =>
  state.rewards.mixedRewards.filter(
    (r) => "isLocalReward" in r
  ) as LocalReward[]

export const selectCopyRewards = (state: RootState) => state.rewards.copyRewards

export const selectMixedReward = (state: RootState) =>
  state.rewards.mixedRewards

export default rewardsSlice.reducer
