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
      .addCase(authRegisters.fulfilled, (action, state) => {
        state.user = action.payload.user;
      })
      .addCase(authLogin.fulfilled, (action, state) => {
        state.user = action.payload.user;
      })
      .addCase(authRegisters.rejected, (state, action) => {
        // Обробка помилки authRegisters
        // Наприклад, можна встановити стан помилки або вивести її в консоль
        console.error("authRegisters failed:", action.error);
      })
      .addCase(authLogin.rejected, (state, action) => {
        // Обробка помилки authLogin
        // Наприклад, можна встановити стан помилки або вивести її в консоль
        console.error("authLogin failed:", action.error);
      });
  },
});
export const authReducer = authSlice.reducer;
