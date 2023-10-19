import { NavigationContainer } from "@react-navigation/native";
import { RegistrationScreen } from "../Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen/LoginScreen";
import { Home } from "../Screens/Home/Home";
import { MapScreen } from "../Screens/MapScreen/MapScreen";
import { CommentsScreen } from "../Screens/CommentsScreen/CommentsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectStateChange } from "../redux/auth/authSelector";
import { refresh } from "../redux/auth/authReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/cofig";

const MainStack = createStackNavigator();
export const Rout = () => {
  const stateChange = useSelector(selectStateChange);
  console.log("stateChange===>", stateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          user: {
            login: user.displayName,
            email: user.email,
            id: user.uid,
          },
          stateChanged: true,
        };
        dispatch(refresh(data));
      } else {
        return;
      }
    });
  }, []);

  const initialRoute = stateChange ? "Login" : "Home";
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={initialRoute}>
        {!stateChange ? (
          <>
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
          </>
        ) : (
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        )}

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
};
