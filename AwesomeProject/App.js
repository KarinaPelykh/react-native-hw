// import { MaterialIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { createStackNavigator, Screen } from "@react-navigation/stack";
import { Home } from "./Screens/Home/Home";
import { MapScreen } from "./Screens/MapScreen/MapScreen";
import { CommentsScreen } from "./Screens/CommentsScreen/CommentsScreen";

const MainStack = createStackNavigator();
export default function App() {
  return (
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
          // options={({ navigation }) => ({
          //   title: "Публікації ",
          //   headerLeft: null,
          //   headerStyle: {
          //     backgroundColor: "#fff",
          //     borderBottomWidth: 1,
          //   },
          //   headerTintColor: "#212121",
          //   headerTitleStyle: {
          //     fontWeight: "bold",
          //     fontSize: 20,
          //   },
          //   headerTitleAlign: "center",
          //   headerRight: () => (
          //     <TouchableOpacity
          //       style={{ width: 24, height: 24, marginRight: 16 }}
          //       onPress={() => {
          //         navigation.navigate("Registration");
          //       }}
          //     >
          //       <MaterialIcons name="logout" size={24} color="gray" />
          //     </TouchableOpacity>
          //   ),
          // })}
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
  );
}
