import "react-native-gesture-handler";
import React from "react";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { Rout } from "./Rout/rout";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Rout />
      </PersistGate>
    </Provider>
  );
}
