import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Dimensions } from "react-native";

export const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
};
const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: screenSize.height,
  },
});
