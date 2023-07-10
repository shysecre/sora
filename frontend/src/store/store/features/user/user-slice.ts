import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetUserResponse } from "../../../api/user/user-slice-api.types";
import { RootState } from "../../store";

interface UserState {
  id: string;
  twitchId: string;
  twitchName: string;
  twitchImage: string;
}

const initialState = {} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GetUserResponse>) => {
      state.id = action.payload.id;
      state.twitchId = action.payload.twitch_id;
      state.twitchName = action.payload.twitch_name
      state.twitchImage = action.payload.twitch_image
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
