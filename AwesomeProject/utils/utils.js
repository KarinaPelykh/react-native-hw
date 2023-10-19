import { storage } from "firebase/storage";
import { getDownloadURL, ref } from "firebase/storage";

export const adaptationFoto = async ({ foto }) => {
  console.log(foto);
  try {
    if (foto) {
      const respons = await fetch(foto, location);
      const file = await respons.blob();
      const uniCodePostId = Date.now().toString();

      const downloadURL = await getDownloadURL(
        ref(storage, `postImage/${uniCodePostId}`)
      );
      return downloadURL;
    } else {
      throw new Error("Фото не було надано");
    }
  } catch (error) {
    console.error("Помилка обробки фото:", error);
    throw error;
  }
};
