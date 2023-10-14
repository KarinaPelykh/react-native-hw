import { Dimensions, Text, View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
export const CreatePostsScreen = () => {
  const [foto, setFoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

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
      const uri = camera.uri;
      await MediaLibrary.createAssetAsync(uri);
      console.log(uri);
    }
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setFoto}>
        <TouchableOpacity onPress={Photo} style={styles.button}>
          <Ionicons name="md-camera-sharp" size={24} color="white" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.text}>Завантажте фото </Text>
      <TextInput placeholder="Haзва..." />
      <TextInput placeholder="Місцевість..." />
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
  camera: {
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
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
});
