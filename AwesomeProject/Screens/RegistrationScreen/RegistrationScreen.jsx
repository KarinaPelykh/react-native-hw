import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const screenSize = Dimensions.get("screen");

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handelRegister = () => {
    Alert.alert("Credentials", `${login} + ${email}`);
    console.log({ login: login, email: email, password: password });
    setLogin("");
    setEmail("");
    setPassword("");
  };

  return (
    // <View style={styles.container}>
    <ImageBackground
      style={styles.backgroundFoto}
      source={require("../../images/background.jpg")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, alignItems: "center" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.containerRegist}>
            <View style={styles.form}>
              <View style={styles.contaddfoto}>
                <Image style={styles.avatarFoto} />
                <TouchableOpacity style={styles.buttonOpen}>
                  <AntDesign
                    name="pluscircleo"
                    size={25}
                    color="#FF6C00"
                    style={styles.buttonAdd}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textRegist}>Реєстрація</Text>

              <TextInput
                style={styles.inputText}
                placeholder="Логін"
                value={login}
                onChangeText={setLogin}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.lastInputText}
                placeholder="Пароль"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handelRegister}>
                <Text style={styles.buttonText}>Зареєструватися</Text>
              </TouchableOpacity>
              <Text style={styles.textLink}>Вже є акаунт? Увійти</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundFoto: {
    height: screenSize.height,
    width: screenSize.width,
    flex: 1,
  },
  containerRegist: {
    // width: screenSize.width,
    // paddingLeft: 16,
    // paddingRight: 16,
    // alignItems: "center",
    // borderWidth: 1,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // marginTop: 279,
    // backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    width: screenSize.width,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  textRegist: {
    marginTop: 70,
    marginBottom: 33,
    fontSize: 30,
  },
  button: {
    width: "100%",
    height: 51,
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
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

  inputText: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    // width: 343,
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
  },
  lastInputText: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 43,
    // width: 343,
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
  },
  textLink: {
    color: "#1B4371",
    // marginBottom: 45,
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
  avatarFoto: {
    width: 132,
    height: 120,
  },

  buttonOpen: {
    position: "relative",
    width: 30,
    height: 30,
  },
  buttonAdd: {
    position: "absolute",
    top: -36,
    left: 120,
  },
});
