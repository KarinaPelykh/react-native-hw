import { nanoid } from "@reduxjs/toolkit";
import { storage } from "../firebase/cofig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async ({ imageUri, folder }) => {
  console.log(imageUri, folder);
  const userId = nanoid();

  if (imageUri) {
    try {
      const response = await fetch(imageUri);
      // console.log("response===========", response);
      const file = await response.blob();
      // console.log("file===========", file);
      const imageRef = await ref(storage, `${folder}/${userId}`);
      // console.log("storage===========", imageRef);
      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);
      console.log("downloadURL===========", downloadURL);
      return downloadURL;
    } catch (error) {
      console.warn("uploadImage: ", error);
    }
  }
  return null;
};
