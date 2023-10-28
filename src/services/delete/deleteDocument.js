import { db } from "@/config/firebase";
import alterDoc from "../update/alterDoc";

const getUserFirestore = async (id) => {
  const data = await db.collection('users').doc(id).get();
  if (data.exists) {
     return data.data();
      
  }

}

export default async function deleteDocument(id){
    try {
      const user = await getUserFirestore(id);
      alterDoc({...user, status: 'inactive'}, id);
      // await db.collection('users').doc(id).delete();
    } catch (error) {
      alert(error.code)
    }
  }