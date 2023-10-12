// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Dimensions,
//   ImageBackground,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Keyboard,
//   Platform,
// } from "react-native";
// import background from "../../images/background.jpg";
// import { useState } from "react";
// const screenSize = Dimensions.get("screen");
// export const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const hendelLogin = () => {
//     console.log({ email: email, password: password });

//     setEmail("");
//     setPassword("");
//   };

//   return (
//     //   <View style={styles.container}>
//     <ImageBackground style={styles.background} source={background}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1, alignItems: "center" }}
//         >
//           <View style={styles.containerLog}>
//             <View style={styles.form}>
//               <Text style={styles.textLog}>Увійти</Text>

//               <TextInput
//                 style={styles.inputText}
//                 placeholder="Адреса електронної пошти"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//               <TextInput
//                 style={styles.lastInputText}
//                 placeholder="Пароль"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={true}
//               />
// <TouchableOpacity
//   style={styles.button}
//   onPress={hendelLogin}
//   // onPress={() => navigation.navigate("Home")}
// >
//   <Text style={styles.buttonText}>Увійти</Text>
// </TouchableOpacity>
// <Text style={styles.text}>
//   Немає акаунту?
//   <Text
//     style={styles.textLink}
//     onPress={() => navigation.navigate("Registration")}
//   >
//     Зареєструватися
//   </Text>
//               </Text>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </ImageBackground>
//     // </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   containerLog: {
//     // position: "relative",
//     // width: screenSize.width,
//     // height: screenSize.height,
//     // paddingLeft: 16,
//     // paddingRight: 16,
//     // alignItems: "center",
//     // borderColor: "#000",
//     // borderWidth: 1,
//     // borderTopLeftRadius: 25,
//     // borderTopRightRadius: 25,
//     // marginTop: 320,
//     // backgroundColor: "#fff",
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   form: {
//     width: screenSize.width,
//     paddingLeft: 16,
//     paddingRight: 16,

//     alignItems: "center",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     backgroundColor: "#fff",
//     alignItems: "center",
//   },
//   background: {
//     flex: 1,
//     width: screenSize.width,
//     height: screenSize.height,
//   },
//   textLog: {
//     marginTop: 32,
//     marginBottom: 33,
//     fontSize: 30,
//   },
//   button: {
//     width: " 100%",
//     height: 51,
//     borderRadius: 100,
//     paddingTop: 16,
//     paddingBottom: 16,
//     paddingLeft: 32,
//     paddingRight: 32,
//     backgroundColor: "#FF6C00",
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   inputText: {
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,

//     width: "100%",
//     height: 50,
//     borderColor: "#E8E8E8",
//     backgroundColor: "#F6F6F6",
//     borderWidth: 1,
//   },
//   lastInputText: {
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 43,
//     width: "100%",
//     height: 50,
//     borderColor: "#E8E8E8",
//     backgroundColor: "#F6F6F6",
//     borderWidth: 1,
//   },
//   text: {
//     color: "#1B4371",
//     marginBottom: 70,
//     fontSize: 16,
//   },
//   textLink: {
//     textDecorationLine: "underline",
//     color: "#1B4371",
//     marginBottom: 111,
//     fontSize: 16,
//   },
// });

import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
} from "react-native";

export const LoginScreen = ({ navigation }) => {
  const [shift, setShift] = useState(false);
  const [position] = useState(new Animated.Value(0));

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", () => {
      setShift(true);
    });
    const listenerHide = Keyboard.addListener("keyboardDidHide", () => {
      setShift(false);
    });

    return () => {
      listenerShow.remove();
      listenerHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(position, {
      // toValue: shift ? 230 : 50,
      toValue: shift ? 180 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [shift]);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hendelLogin = () => {
    // Alert.alert("Credentials", `${login} + ${email}`);
    console.log({ email: email, password: password });

    setEmail("");
    setPassword("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../../images/background.jpg")}
        style={styles.bg}
        resizeMode="cover"
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
      >
        <Animated.View
          style={[styles.formWrapper, { paddingBottom: position }]}
        >
          <Text style={styles.title}>Увійти</Text>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={hendelLogin}
            // onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <Text style={styles.textLink}>
            Немає акаунту?
            <Text
              style={styles.textLink}
              onPress={() => navigation.navigate("Registration")}
            >
              Зареєструватися
            </Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    minHeight: screenSize.height,
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
    avatarFoto: {
      width: 132,
      height: 120,
    },
  },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 30 },
  inputsContainer: { gap: 10, width: "100%", padding: 16, marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },

  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: "flex-end",
  },
  formWrapper: {
    marginTop: 150,
    paddingTop: 65,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    padding: 15,
    borderRadius: 30,

    marginBottom: 15,
    height: 51,
    width: 320,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  textLink: {
    color: "#1B4371",
    fontSize: 16,
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
