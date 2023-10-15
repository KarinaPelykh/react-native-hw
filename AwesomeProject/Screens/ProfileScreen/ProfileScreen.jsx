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
export const ProfileScreen = ({ route }) => {
  const { login } = route.params;

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

        <Text style={styles.text}>{login}</Text>

        <View
          style={{
            width: 343,
            height: 240,
          }}
        >
          <Image />
        </View>
      </View>
    </View>
  );
};

const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    minHeight: screenSize.height,
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
    top: -55,
  },

  formWrapper: {
    // marginTop: 150,
    marginTop: 350,
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
