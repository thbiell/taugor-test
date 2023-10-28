import { db } from '@/config/firebase';

export default async function alterDoc(user) {
    await db.collection('users').doc(user.previousRecord).set({ ...user, savedAt: new Date() })
}