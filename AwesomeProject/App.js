import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.emptySpace}></View>
      <View>
        {/* <LoginScreen /> */}
        {/* <RegistrationScreen /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  emptySpace: {
    flex: 1,
  },
});
