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
      console.log(users);
      await updateProfile(user, {
        displayName: login,
      });
      return users;
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

      console.log("userCredential--->", userCredential);
      return userCredential; // Return the logged-in user
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
