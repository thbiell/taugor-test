import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

export default async function registerImage(file, id) {
    if (file == null) return null;

    const imageRef = ref(storage, `images/${id}/${file.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, file);

    try {
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Erro ao obter a URL do Firebase Storage:", error);
        return null;
    }
}
