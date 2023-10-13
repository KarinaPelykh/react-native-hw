import { Dimensions, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { useRoute } from "@react-navigation/native";
const Tabs = createBottomTabNavigator();

export const Home = () => {
  const route = useRoute();
  const { login, email } = route.params;
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
          height: 83,
          padding: 9,
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        activeBackgroundColor: "tomato",
        inactiveTintColor: "black",
        tabStyle: {
          borderRadius: 100,
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        initialParams={{ login, email }}
        options={{ tabBarLabel: "", headerShown: false }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        options={{ tabBarLabel: "", headerShown: false }}
        component={CreatePostsScreen}
      />

      <Tabs.Screen
        name="ProfileScreen"
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
