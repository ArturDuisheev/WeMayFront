import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterSlice from "./slices/filterSlice";
import authSlice from "./slices/authSlice";
import notificationSlice from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    auth: authSlice,
    notification: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
