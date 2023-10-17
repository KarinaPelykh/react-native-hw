import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/cofig";

export const authRegisters = createAsyncThunk(
  "auth/register",
  async ({ login, email, password }, { rejectWithValue }) => {
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      const data = {
        user: {
          login: user.displayName,
          email: user.email,
          id: user.uid,
        },
      };
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const data = {
        user: {
          login: user.displayName,
          email: user.email,
          id: user.uid,
        },
      };
      console.log("userCredential--->", userCredential);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
