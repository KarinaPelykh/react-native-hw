import React from "react";
import { Entypo } from "@expo/vector-icons";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
export const CreatePostsScreen = ({ navigation }) => {
  const [foto, setFoto] = useState(null);
  const [takeFoto, setTakeFoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [name, setName] = useState("");
  const [lokation, setLokation] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const Photo = async () => {
    if (foto) {
      const camera = await foto.takePictureAsync();
      const cameraFoto = camera.uri;
      setTakeFoto(cameraFoto);
      await MediaLibrary.createAssetAsync(cameraFoto);
    }
  };

  const handelInfo = () => {
    // console.log({ name: name, lokation: lokation });
    setName("");
    setLokation("");
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setFoto}>
        {takeFoto && (
          <View style={styles.fotoDiv}>
            <Image source={{ uri: takeFoto }} style={styles.foto} />
          </View>
        )}

        <TouchableOpacity onPress={Photo} style={styles.button}>
          <Ionicons name="md-camera-sharp" size={24} color="white" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.text}>Завантажте фото </Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Haзва..."
          value={name}
          onChangeText={setName}
        />
        <View>
          <TextInput
            style={styles.inputsecond}
            placeholder="Місцевість..."
            value={lokation}
            onChangeText={setLokation}
          />
          <Entypo
            name="location-pin"
            size={24}
            color="gray"
            style={{
              position: "absolute",
              top: 15,
              left: -5,
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonCreat}
          onPress={() => {
            handelInfo();
            navigation.navigate("PostsScreen", { takeFoto, name, lokation });
          }}
        >
          <Text style={styles.textButton}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// CreatePostsScreen.navigationOptions = {
//   tabBarVisible: false,
// };
const screenSize = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    minHeight: screenSize.height,
    backgroundColor: "white",
    padding: 16,
  },
  camera: {
    backgroundColor: "#E8E8E8",
    height: 240,
    alignItems: "center",
  },

  button: {
    marginTop: 90,
    backgroundColor: "#FFFFFF4D",
    borderRadius: 50,
    width: 60,
    height: 60,
    padding: 18,
    justifyContent: "center",
  },
  text: {
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    fontWeight: "400",
    color: "#E8E8E8",
  },
  input: {
    padding: 15,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
  },
  inputsecond: {
    position: "relative",
    padding: 15,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
  },
  buttonCreat: {
    height: 51,
    borderRadius: 100,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  textButton: {
    color: "#BDBDBD",
  },
  fotoDiv: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "red",
    borderWidth: 2,
    height: 240,
    width: 330,
    borderRadius: 10,
    borderWidth: 1,
  },
});
