import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import background from "../../images/background.jpg";
import { useState } from "react";
const screenSize = Dimensions.get("screen");
export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hendelLogin = () => {
    console.log({ email: email, password: password });
    setEmail("");
    setPassword("");
  };

  return (
    //   <View style={styles.container}>
    <ImageBackground style={styles.background} source={background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, alignItems: "center" }}
        >
          <View style={styles.containerLog}>
            <View style={styles.form}>
              <Text style={styles.textLog}>Увійти</Text>

              <TextInput
                style={styles.inputText}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.lastInputText}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.button} onPress={hendelLogin}>
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.text}>
                Немає акаунту?
                <Text style={styles.textLink}>Зареєструватися</Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
    // </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLog: {
    // position: "relative",
    // width: screenSize.width,
    // height: screenSize.height,
    // paddingLeft: 16,
    // paddingRight: 16,
    // alignItems: "center",
    // borderColor: "#000",
    // borderWidth: 1,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // marginTop: 320,
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
  background: {
    flex: 1,
    width: screenSize.width,
    height: screenSize.height,
  },
  textLog: {
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
  },
  button: {
    width: " 100%",
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
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
  },
  text: {
    color: "#1B4371",
    marginBottom: 70,
    fontSize: 16,
  },
  textLink: {
    textDecorationLine: "underline",
    color: "#1B4371",
    marginBottom: 111,
    fontSize: 16,
  },
});
