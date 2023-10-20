import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { db } from "../../firebase/cofig";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";
export const CommentsScreen = () => {
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const rout = useRoute();
  useEffect(() => {
    if (rout.params) {
      setPhoto(rout.params.photo);
    }
    console.log(rout.params.photo);
  }, [rout.params]);

  useEffect(() => {
    (async () => {
      // const addComment = doc(db, "posts", rout.params.id);
      // console.log("addComment", addComment);
      onSnapshot(collection(db, "comentar"), (doc) => {
        const comentar = doc.docs
          .map((coment) => ({ ...coment.data(), id: coment.id }))
          .sort((a, b) => b.date - a.date);
        setComments(comentar);
      });
    })();
  }, []);

  // const handelAddComent = () => {
  //   setComments((prevState) => [...prevState, comment]);
  //   setComment("");
  // };

  // const handlePost = async () => {
  //   try {
  //     const postData = {
  //       comment,
  //       date: Date.now(),
  //     };

  //     const docRef = await addDoc(collection(db, "comentar"), postData);
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (error) {
  //     console.error("Error handling post: ", error);
  //   }
  // };
  const handelAddComent = async () => {
    const id = nanoid();
    try {
      const postData = {
        id,
        comment,
        date: Date.now(),
      };

      const docRef = await addDoc(collection(db, "comentar"), postData);
      console.log("Document written with ID: ", docRef.id);
      setComments((prevState) => [...prevState, comment]);
      setComment("");
    } catch (error) {
      console.error("Error handling post: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{ height: 240, borderRadius: 10, marginBottom: 20 }}
          />
        )}
        <View style={{ flexDirection: "column" }}>
          {comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: "row" }}>
              <Text style={styles.comment} key={comment.id}>
                {comment.comment}
              </Text>

              <Image
                style={{
                  height: 28,
                  borderRadius: 100,
                  width: 28,
                  marginLeft: 16,
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                }}
              />
            </View>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            style={styles.buttonSumbit}
            onPress={handelAddComent}
          >
            <AntDesign name="arrowup" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    height: screenSize.height,
    backgroundColor: "#fff",
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    position: "relative",

    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#F6F6F6",
    width: 329,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    padding: 8,
  },
  buttonSumbit: {
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    position: "absolute",
    borderRadius: 100,
    top: 8,
    left: 285,
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    backgroundColor: "#E8E8E8",
    width: 286,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
    padding: 16,

    fontSize: 13,
    fontWeight: "400",
    color: "#212121",
  },
});
