import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

export const PostsScreen = ({ route }) => {
  const [post, setPost] = useState([]);

  // const { login, email } = route.params;
  console.log(route.params);
  useEffect(() => {
    setPost((prevState) => [...prevState, route.params]);
  }, [route.params]);
  console.log("post---->", post);
  console.log("route.params---->", route.params);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 32 }}>
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
          {/* <Text style={{ fontSize: 17, fontWeight: 700 }}>{login}</Text>
          <Text style={{ fontSize: 11, fontWeight: 400, color: "#212121CC" }}>
            {email}
          </Text> */}
        </View>
      </View>
      <FlatList
        data={post}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.takeFoto }} style={{ height: 240 }} />
            <Text style={{ fontSize: 17, fontWeight: 700 }}>{item.name}</Text>
            <Text style={{ fontSize: 11, fontWeight: 400, color: "#212121CC" }}>
              {item.lokation}
            </Text>
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
