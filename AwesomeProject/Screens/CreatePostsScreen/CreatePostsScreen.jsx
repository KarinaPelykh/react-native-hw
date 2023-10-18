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
export const CreatePostsScreen = ({ navigation }) => {
  const [foto, setFoto] = useState(null);
  const [takeFoto, setTakeFoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [name, setName] = useState("");
  const [lokation, setLokation] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      }
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
            <Image source={{ uri: takeFoto }} style={{ borderRadius: 10 }} />
          </View>
        )}
        <TouchableOpacity onPress={Photo} style={styles.button}>
          <Ionicons name="md-camera-sharp" size={24} color="white" />
        </TouchableOpacity>
      </Camera>
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
            value={lokation}
            onChangeText={setLokation}
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

// import React, { useState, useEffect } from "react";
// import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
// import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";

// export const CreatePostsScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();

//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type} ref={setCameraRef}>
//         <View style={styles.photoView}>
//           <TouchableOpacity
//             style={styles.flipContainer}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}
//           >
//             <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
//               Flip
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={async () => {
//               if (cameraRef) {
//                 const { uri } = await cameraRef.takePictureAsync();
//                 await MediaLibrary.createAssetAsync(uri);
//               }
//             }}
//           >
//             <View style={styles.takePhotoOut}>
//               <View style={styles.takePhotoInner}></View>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   camera: { flex: 1 },
//   photoView: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "flex-end",
//   },

//   flipContainer: {
//     flex: 0.1,
//     alignSelf: "flex-end",
//   },

//   button: { alignSelf: "center" },

//   takePhotoOut: {
//     borderWidth: 2,
//     borderColor: "white",
//     height: 50,
//     width: 50,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//   },

//   takePhotoInner: {
//     borderWidth: 2,
//     borderColor: "white",
//     height: 40,
//     width: 40,
//     backgroundColor: "white",
//     borderRadius: 50,
//   },
// });
