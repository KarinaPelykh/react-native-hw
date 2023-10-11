import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import backgroundFoto from "../../images/background.jpg";
import { AntDesign } from "@expo/vector-icons";
const screenSize = Dimensions.get("screen");

export const RegistrationScreen = () => {
  return (
    <ImageBackground style={styles.backgroundFoto} source={backgroundFoto}>
      <View style={styles.containerRegist}>
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
        <TextInput type="text" style={styles.inputText} placeholder="Логін" />
        <TextInput
          type="text"
          style={styles.inputText}
          placeholder="Адреса електронної пошти"
        />
        <TextInput
          type="text"
          style={styles.lastInputText}
          placeholder="Пароль"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
        <Text style={styles.textLink}>Вже є акаунт? Увійти</Text>
        {/* <View style={styles.homeIndicatr}>
          <View style={styles.indicator}></View>
        </View> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerRegist: {
    position: "relative",
    height: screenSize.height,
    width: screenSize.width,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 270,
    backgroundColor: "#fff",
  },
  textRegist: {
    marginTop: 70,
    marginBottom: 33,
    fontSize: 30,
  },
  button: {
    width: 343,
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
    width: 343,
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
  },
  lastInputText: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 43,
    width: 343,
    height: 50,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
  },
  textLink: {
    color: "#1B4371",
    marginBottom: 45,
    fontSize: 16,
  },
  // homeIndicatr: {
  //   width: 375,
  //   height: 34,
  //   paddingRight: 120,
  //   paddingLeft: 120,
  //   paddingTop: 21,
  //   margin: 0,
  // },
  // indicator: {
  //   width: 134,
  //   height: 5,
  //   backgroundColor: "#212121",
  //   borderRadius: 10,
  //   margin: 0,
  // },
  contaddfoto: {
    width: 132,
    height: 120,
    borderWidth: 1,

    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
    borderRadius: 15,

    position: "absolute",
    top: -65,
    left: 120,
  },
  avatarFoto: {
    width: 132,
    height: 120,
  },
  backgroundFoto: {
    height: screenSize.height,
    width: screenSize.width,
    flex: 1,
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
