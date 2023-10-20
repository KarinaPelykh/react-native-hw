// import { storage } from "firebase/storage";
// import { getDownloadURL, ref } from "firebase/storage";

// export const adaptationFoto = async ({ foto }) => {
//   console.log(foto);
//   try {
//     if (foto) {
//       const respons = await fetch(foto);
//       const file = await respons.blob();
//       const uniCodePostId = Date.now().toString();

//       const downloadURL = await getDownloadURL(
//         ref(storage, `postImage/${uniCodePostId}`)
//       );
//       return downloadURL;
//     } else {
//       throw new Error("Фото не було надано");
//     }
//   } catch (error) {
//     console.error("Помилка обробки фото:", error);
//     throw error;
//   }
// };
import { nanoid } from "@reduxjs/toolkit";
import { storage } from "firebase/storage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const adaptationFoto = async ({ image }) => {
  const uniqueAvatarId = nanoid();

  if (image) {
    try {
      const response = await fetch(image);
      const file = await response.blob();

      const imageRef = ref(storage, `postImages/${uniqueAvatarId}`);

      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    } catch (error) {
      console.error("adaptationFoto: ", error);
      throw error;
    }
  } else {
    console.warn("adaptationFoto: No image provided");
    return null;
  }
};
