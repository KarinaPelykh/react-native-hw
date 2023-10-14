import { Text, View, Image, StyleSheet, Dimensions } from "react-native";

export const PostsScreen = ({ route }) => {
  const { login, email } = route.params;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 32 }}>
        <View
          style={{
            width: 60,
            height: 60,
            marginRight: 8,
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            }}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
        </View>
        <View
          style={{ flexDirection: "column", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 17, fontWeight: 700 }}>{login}</Text>
          <Text style={{ fontSize: 11, fontWeight: 400, color: "#212121CC" }}>
            {email}
          </Text>
        </View>
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
});
