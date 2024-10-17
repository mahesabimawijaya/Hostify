// import { AppDispatch, AppStore } from "@/lib/redux/store";
// import store from "@/lib/redux/store";
// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
//   useStore,
// } from "react-redux";

// type RootState = ReturnType<typeof store.getState>;

// export const useAppDispatch = (): AppDispatch => useDispatch();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useAppStore = useStore.withTypes<AppStore>();

// src/app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
