import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/cofig";

export const authRegisters = createAsyncThunk(
  "auth/register",
  async ({ login, email, password }, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("user===>", user);
      await updateProfile(user, {
        displayName: login,
      });
      console.log("displayName---->", login);

      const data = {
        user: {
          login: user.displayName,
          email: user.email,
          id: user.uid,
        },
      };
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

// export const authStateChanged = createAsyncThunk(
//   "auth/stateChange",
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       onAuthStateChanged(auth, (user) => {
//         if (user) {
//           // Отримати дані профілю користувача, наприклад, ім'я (login)
//           const data = {
//             user: {
//               login: user.displayName,
//               email: user.email,
//               id: user.uid,
//             },
//           };

//           dispatch(updateProfile(data));
//         }
//       });
//       return;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
