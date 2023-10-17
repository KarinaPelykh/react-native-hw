import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegisters } from "./authOperation";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      login: null,
      email: null,
      id: null,
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(authRegisters.fulfilled, (state, { payload }) => {
        state.user = payload.user;
      })
      .addCase(authLogin.fulfilled, ({ payload }, state) => {
        state.user = payload.user;
      })
      .addCase(authRegisters.rejected, (action) => {
        console.error("authRegisters failed:", action.error);
      })
      .addCase(authLogin.rejected, (action) => {
        console.error("authLogin failed:", action.error);
      });
  },
});

export const authReducer = authSlice.reducer;
