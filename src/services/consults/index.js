import { db } from "@/config/firebase"

export async function getUserByEmail(collection, email){
    const data = db.collection(collection).where('email', '==',email)
    return (await data.get()).docs.map(doc => ({ id: doc.id, data: doc.data() }))
}

export async function getUserById(collection, id){
    const data = await db.collection('users').doc(id).get();
    return {id: data.id, data: data.data()};
}
