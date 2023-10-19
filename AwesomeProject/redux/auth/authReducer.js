import { createSlice } from "@reduxjs/toolkit";
import {
  authLogin,
  authRegisters,
  // authStateChanged,
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

  reducers: {
    refresh: (state, { payload }) => {
      state.user = payload.user;
      state.stateChange = true;
      console.log("reducer===>>>", state.stateChange);
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(authRegisters.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        console.log("state======>", payload.user.login);
        state.stateChange = true;
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        console.log("payload.user", payload.user);
        state.user = payload.user;
        state.stateChange = true;
      })

      .addCase(logOut.fulfilled, (state, { payload }) => {
        state.user = { login: null, email: null, id: null };
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

export const { refresh } = authSlice.actions;
export const authReducer = authSlice.reducer;
