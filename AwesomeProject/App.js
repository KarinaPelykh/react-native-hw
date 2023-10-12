import { StatusBar } from "expo-status-bar";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </>
  );
}
