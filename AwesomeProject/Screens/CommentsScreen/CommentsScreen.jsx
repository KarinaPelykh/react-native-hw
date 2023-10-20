import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
export const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  return (
    <View style={styles.container}>
      {/* <FlatList
        // data={allComments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {item.takeFoto && (
              <Image
                source={{ uri: item.takeFoto }}
                style={{ height: 240, borderRadius: 10 }}
              />
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Коментувати..."
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity style={styles}>
                <AntDesign name="arrowup" size={24} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      /> */}
    </View>
  );
};
const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: screenSize.height,
  },
  inputContainer: {
    height: 50,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,

    borderRadius: 20,
  },
});
