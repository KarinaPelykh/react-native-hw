import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyBPMod-8zUdwO0poY_lu71MTaFOb_xqguY",
//   authDomain: "react-native-application-4f575.firebaseapp.com",
//   projectId: "react-native-application-4f575",
//   storageBucket: "react-native-application-4f575.appspot.com",
//   messagingSenderId: "261016978363",
//   appId: "1:261016978363:web:a1e6b7dfdaa1186107ba9e",
//   measurementId: "G-82RH9STQG6",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDvUeKmSfdtiyKubfd_BE3-zitl8ZruLVE",
  authDomain: "react-netive.firebaseapp.com",
  projectId: "react-netive",
  storageBucket: "react-netive.appspot.com",
  messagingSenderId: "663688171238",
  appId: "1:663688171238:web:7923a4365a648259003527",
  measurementId: "G-W9EYGEK1JY",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const storage = getStorage(app);
export const db = getFirestore(app);
