import { createSlice } from "@reduxjs/toolkit";
import {
  authLogin,
  authRegisters,
  authStateChanged,
  logOut,
} from "./authOperation";
import { Alert } from "react-native";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      login: null,
      email: null,
      id: null,
    },
    stateChange: false,
  },

  extraReducers: (bulder) => {
    bulder
      .addCase(authRegisters.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.stateChange = payload.stateChange;
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.stateChange = true;
      })
      .addCase(authStateChanged.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.stateChange = payload.stateChange;
      })
      .addCase(logOut.fulfilled, (state, { payload }) => {
        state.user = { login: null, email: null };
        state.stateChange = false;
      })
      .addCase(authRegisters.rejected, (action) => {
        Alert.alert(`Пройдіть реєстрацію`);
      })
      .addCase(authLogin.rejected, (action) => {
        Alert.alert(`Вибачте, але такого користувача не знайдено`);
      });
  },
});

export const authReducer = authSlice.reducer;
