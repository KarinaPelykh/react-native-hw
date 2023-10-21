import "react-native-gesture-handler";
import React from "react";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { Rout } from "./Rout/rout";
import { useFonts } from "expo-font";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              height: screenSize.height,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator animating={true} color="#FF6C00" />
          </View>
        }
        persistor={persistor}
      >
        <Rout />
      </PersistGate>
    </Provider>
  );
}
const screenSize = Dimensions.get("screen");
