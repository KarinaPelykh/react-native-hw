import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
export const LoginScreen = () => {
  return (
    <View style={styles.containerLog}>
      <Text style={styles.textLog}>Увійти</Text>

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
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>
      <Text style={styles.textLink}>Немає акаунту? Зареєструватися</Text>

      <View style={styles.homeIndicatr}>
        <View style={styles.indicator}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerLog: {
    position: "relative",
    width: 375,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 0,
  },
  textLog: {
    marginTop: 32,
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
  homeIndicatr: {
    width: 375,
    height: 34,
    paddingRight: 120,
    paddingLeft: 120,
    paddingTop: 21,
    margin: 0,
  },
  indicator: {
    width: 134,
    height: 5,
    backgroundColor: "#212121",
    borderRadius: 10,
    margin: 0,
  },
});
