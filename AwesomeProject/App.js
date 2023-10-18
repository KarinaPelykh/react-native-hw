import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { createStackNavigator, Screen } from "@react-navigation/stack";
import { Home } from "./Screens/Home/Home";
import { MapScreen } from "./Screens/MapScreen/MapScreen";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { authStateChanged } from "./redux/auth/authOperation";
const MainStack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen
              name="Registration"
              options={{ headerShown: false }}
              component={RegistrationScreen}
            />
            <MainStack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />

            <MainStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="MapScreen"
              component={MapScreen}
              options={({ navigation }) => ({
                title: "Мапа ",

                headerStyle: {
                  backgroundColor: "#fff",
                  borderBottomWidth: 1,
                },
                headerTintColor: "#212121",
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: 20,
                },
                headerTitleAlign: "center",
              })}
            />

            <MainStack.Screen
              name="CommentsScreen"
              options={({ navigation }) => ({
                title: "Коментарі ",

                headerStyle: {
                  backgroundColor: "#fff",
                  borderBottomWidth: 1,
                },
                headerTintColor: "#212121",
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: 20,
                },
                headerTitleAlign: "center",
              })}
              component={CommentsScreen}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
