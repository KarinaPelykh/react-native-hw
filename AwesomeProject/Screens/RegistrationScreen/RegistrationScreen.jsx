import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { authRegisters } from "../../redux/auth/authOperation";
import { selectorLogin } from "../../redux/auth/authSelector";

export const RegistrationScreen = ({ navigation }) => {
  const [shift, setShift] = useState(false);
  const [position] = useState(new Animated.Value(0));
  const user = useSelector(selectorLogin);
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
      toValue: shift ? 230 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [shift]);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();

  const handelRegister = () => {
    if (login === "" || email === "" || showPassword === "") {
      Alert.alert(`Пройдіть реєстрацію`);
    } else {
      const data = { login, email, password };
      dispatch(authRegisters(data))
        .unwrap()
        .then(() => {
          setLogin("");
          setEmail("");
          setPassword("");

          navigation.navigate("Home", { login, email });
        });
    }
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
                color="#FF6C00"
                style={styles.buttonAdd}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
            />
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
            />
            <View style={{ position: "relative" }}>
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity
                style={{ position: "absolute", top: 15, left: 240 }}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <Text style={{ color: "#1B4371", fontSize: 16 }}>
                  {showPassword ? "Показати" : "Сховати"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handelRegister();
            }}
          >
            <Text style={styles.buttonText}>Зареєструватися</Text>
          </TouchableOpacity>
          <Text style={styles.textLink}>
            Вже є акаунт?
            <Text
              style={styles.textLink}
              onPress={() => navigation.navigate("Login")}
            >
              Увійти
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
    top: -1,
    left: -1,
    width: 132,
    height: 120,
    borderRadius: 15,
  },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  inputsContainer: { gap: 10, width: "100%", padding: 16, marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
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
    top: 70,
    left: 120,
  },
});
