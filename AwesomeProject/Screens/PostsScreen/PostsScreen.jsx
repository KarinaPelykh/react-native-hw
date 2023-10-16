import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";

export const PostsScreen = ({ route, navigation }) => {
  const [post, setPost] = useState([]);
  const { login, email } = route.params;
  console.log(route.params);
  useEffect(() => {
    if (route.params) {
      setPost((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("post---->", post);
  console.log("route.params---->", route.params);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 32, marginBottom: 32 }}>
        <View
          style={{
            width: 60,
            height: 60,
            marginRight: 8,
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            }}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
        </View>
        <View
          style={{ flexDirection: "column", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 17, fontWeight: 700 }}>{login}</Text>
          <Text style={{ fontSize: 11, fontWeight: 400, color: "#212121CC" }}>
            {email}
          </Text>
        </View>
      </View>

      <FlatList
        data={post}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {item.takeFoto && (
              <Image
                source={{ uri: item.takeFoto }}
                style={{ height: 240, borderRadius: 10 }}
              />
            )}
            {item.name && (
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  width: 200,
                  height: 30,
                }}
              >
                {item.name}
              </Text>
            )}
            {item.lokation && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginBottom: 23,
                }}
              >
                <TouchableOpacity
                  style={{ marginRight: 235 }}
                  onPress={() => {
                    navigation.navigate("CommentsScreen");
                  }}
                >
                  <EvilIcons name="comment" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MapScreen");
                  }}
                >
                  <EvilIcons name="location" size={24} color="gray" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "#212121CC",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.lokation}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    minHeight: screenSize.height,
    backgroundColor: "white",
    padding: 16,
  },
});
