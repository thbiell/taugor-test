import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

import { v4 } from "uuid";
import { storage } from '@/config/firebase'
import { setUrl } from "@/config/auth";

export default async function registerFile(file, id) {

    if (file == null) return;
    const imageRef = ref(storage, `files/${id}/${file.name + v4()}`);
    
    await uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setUrl(url);
        });
    });
}