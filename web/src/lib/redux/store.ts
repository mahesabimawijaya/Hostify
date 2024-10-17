import { combineReducers } from "redux";
import userSlice from "./slices/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import checkInOutSlice from "./slices/checkInOut.slice";

const reducer = combineReducers({
  auth: userSlice,
  checkInOut: checkInOutSlice,
});

const store = configureStore({
  reducer,
});

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
