import { AntDesign } from "@expo/vector-icons";

import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/authOperation";
import { selectorLogin } from "../../redux/auth/authSelector";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/cofig";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const ProfileScreen = ({ navigation }) => {
  const user = useSelector(selectorLogin);
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logOut());
  };
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(0);
  const step = 1;
  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "posts"), (doc) => {
        const posts = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setPosts(posts);
      });
    })();
  }, []);

  const handelLike = () => {
    const liks = step + like;
    setLike(liks);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../../images/background.jpg")}
        style={styles.bg}
        resizeMode="cover"
      />
      <View style={styles.formWrapper}>
        <View style={styles.contaddfoto}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.buttonOpen}>
            <AntDesign
              name="pluscircleo"
              size={25}
              color="#BDBDBD"
              style={styles.buttonAdd}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            top: 22,
            right: 16,
          }}
          onPress={handelLogout}
        >
          <MaterialIcons name="logout" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={styles.text}>{user.login}</Text>

        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ height: 240, borderRadius: 10, width: 343 }}
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
              {item.adress && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    marginBottom: 23,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      navigation.navigate("CommentsScreen", {
                        photo: item.imageUrl,
                        id: item.id,
                      });
                    }}
                  >
                    <FontAwesome name="comment" size={18} color="#FF6C00" />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={handelLike}>
                      <EvilIcons name="like" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text>{like}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          location: item.location,
                        });
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
                      {item.adress}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    height: screenSize.height,
    backgroundColor: "white",
  },

  bg: {
    top: 0,
    position: "absolute",
    height: screenSize.height,
    width: screenSize.width,
  },
  avatar: {
    position: "absolute",
    top: -1,
    left: -1,
    width: 132,
    height: 120,
    borderRadius: 15,
  },

  formWrapper: {
    position: "relative",
    marginTop: 150,
    paddingTop: 65,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  contaddfoto: {
    width: 132,
    height: 120,
    borderWidth: 1,

    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
    borderRadius: 15,

    position: "absolute",
    top: -65,
    left: 110,
  },

  text: {
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    fontWeight: "500",
  },
  buttonOpen: {
    position: "relative",
    width: 30,
    height: 30,
  },
  buttonAdd: {
    position: "absolute",
    top: 75,
    left: 120,
  },
});
