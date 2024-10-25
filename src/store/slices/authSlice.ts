import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  isAuth: boolean;
  isAuthOpen: boolean;
}

const initialState: State = {
  isAuth: false,
  isAuthOpen: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setIsAuthOpen(state, action: PayloadAction<boolean>) {
      state.isAuthOpen = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setIsAuth, setIsAuthOpen } = authSlice.actions;
