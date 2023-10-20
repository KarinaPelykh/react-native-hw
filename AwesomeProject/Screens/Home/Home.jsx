import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/authOperation";
import { selectorLogin } from "../../redux/auth/authSelector";
const Tabs = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const user = useSelector(selectorLogin);
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logOut());
  };
  return (
    <Tabs.Navigator
      style={styles.container}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "ProfileScreen") {
            iconName = "ios-person-outline";
          } else if (route.name === "CreatePostsScreen") {
            iconName = "add-outline";
          } else if (route.name === "PostsScreen") {
            iconName = "ios-grid-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{ marginTop: 10 }}
            />
          );
        },

        tabBarStyle: {
          width: screenSize.width,
          height: 60,
          padding: 9,
        },
        tabBarLabelStyle: {},
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: "true ",
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        initialParams={{ user }}
        options={({ navigation }) => ({
          tabBarLabel: "",
          title: "Публікації ",
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 1,
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 17,
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ width: 24, height: 24, marginRight: 16 }}
              onPress={handelLogout}
            >
              <MaterialIcons name="logout" size={24} color="gray" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        options={({ navigation }) => ({
          tabBarLabel: "",
          title: "Створити публікацію ",
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              style={{ width: 24, height: 24, marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("PostsScreen");
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
        component={CreatePostsScreen}
      />

      <Tabs.Screen
        name="ProfileScreen"
        initialParams={{ user }}
        options={{ tabBarLabel: "", headerShown: false }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    // minHeight: screenSize.height,
  },
  containers: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
