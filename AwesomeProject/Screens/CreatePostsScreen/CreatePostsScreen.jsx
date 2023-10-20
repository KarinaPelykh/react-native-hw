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
import * as Location from "expo-location";

import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/cofig";
import { uploadImage } from "../../utils/utils";
import { nanoid } from "@reduxjs/toolkit";
export const CreatePostsScreen = ({ navigation }) => {
  const [foto, setFoto] = useState(null);
  const [takeFoto, setTakeFoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [location, setLocation] = useState(null);
  console.log("STAtE LOCAION ", location);
  // console.log("STAtE takeFoto ", takeFoto);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     console.log("Permission to access location was denied");
    //   } else {
    //     let location = await Location.getCurrentPositionAsync({});
    //     console.log("location===========", location);
    //     const coords = {
    //       latitude: location.coords.latitude,
    //       longitude: location.coords.longitude,
    //     };
    //     setLocation(coords);
    //   }
    // })();

    (async () => {
      await Location.requestForegroundPermissionsAsync();

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      const [adress] = await Location.reverseGeocodeAsync(coords);

      const fullAddress = `${adress.region}, ${adress.country}`;
      setAdress(fullAddress);
    })();
  }, []);

  const Photo = async () => {
    if (foto) {
      const camera = await foto.takePictureAsync();

      const cameraFoto = camera.uri;
      const location = await Location.getCurrentPositionAsync();

      setTakeFoto(cameraFoto);
      await MediaLibrary.createAssetAsync(cameraFoto);
    }
  };
  const handlePost = async () => {
    const id = nanoid();
    try {
      const imageUrl = await uploadImage({
        imageUri: takeFoto,
        folder: "postImages",
      });

      if (imageUrl) {
        const postData = {
          id,
          name,
          imageUrl,
          location,
          adress,
          date: Date.now(),
        };

        const docRef = await addDoc(collection(db, "posts"), postData);
        console.log("Document written with ID: ", docRef.id);
      } else {
        console.error("Failed to upload image. imageUrl is undefined.");
      }
    } catch (error) {
      console.error("Error handling post: ", error);
    }

    handelInfo();
  };

  const handelInfo = () => {
    setTakeFoto("");
    setName("");
    setAdress("");
  };
  return (
    <View style={styles.container}>
      {takeFoto ? (
        <Image
          source={{ uri: takeFoto }}
          style={{ borderRadius: 10, height: 240, width: 330 }}
        />
      ) : (
        <Camera style={styles.camera} ref={setFoto}>
          <TouchableOpacity onPress={Photo} style={styles.button}>
            <Ionicons name="md-camera-sharp" size={24} color="white" />
          </TouchableOpacity>
        </Camera>
      )}
      <Text style={styles.text}>
        {takeFoto ? "Редагувати фото" : "Завантажте фото"}
      </Text>
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
            value={adress}
            onChangeText={setAdress}
          />
          <Entypo
            name="location-pin"
            size={24}
            color="gray"
            style={{
              position: "absolute",
              top: 5,
              left: -5,
            }}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.buttonCreat,
            takeFoto
              ? { backgroundColor: "#FF6C00" }
              : { backgroundColor: "#E8E8E8" },
          ]}
          onPress={() => {
            handlePost();

            navigation.navigate("PostsScreen", {
              takeFoto,
              name,
              adress,
              location,
            });
          }}
        >
          <Text style={styles.textButton}>Опубліковати</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 22,
    fontSize: 16,
    fontWeight: "400",
    color: "#E8E8E8",
  },
  input: {
    padding: 5,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
  },
  inputsecond: {
    position: "relative",
    padding: 5,
    paddingLeft: 15,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
  },
  buttonCreat: {
    height: 51,
    borderRadius: 100,

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

    borderWidth: 2,
    height: 240,
    width: 330,
  },
  textButtonHover: {
    color: "#fff",
  },
  buttonCreatHover: {
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
