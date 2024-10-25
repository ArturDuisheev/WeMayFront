import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface INotificationSliceState {
  isOpen: boolean;
  notification: string;
  type: "success" | "error";
}

const initialState: INotificationSliceState = {
  isOpen: false,
  notification: "",
  type: "success",
};

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.notification = action.payload;
      state.type = "success";
    },
    setErrorNotification(state, action: PayloadAction<string>) {
      state.isOpen = true;
      state.notification = action.payload;
      state.type = "error";
    },
    closeNotification: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setNotification, setErrorNotification, closeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
