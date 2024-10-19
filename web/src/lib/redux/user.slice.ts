import { initialUser } from "./initial";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserLoginPayload } from "@/types/user";
import { deleteCookie, getCookie } from "cookies-next";

export const userSlice = createSlice({
  name: "auth",
  initialState: initialUser as User | null,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    },
    logout: (state) => {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      return initialUser;
    },
  },
});

export const { login, updateProfile, logout } = userSlice.actions;
export default userSlice.reducer;
