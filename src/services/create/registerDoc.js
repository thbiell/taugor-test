import { setItem } from '@/config/auth';
import { db } from '@/config/firebase';

export default async function registerDoc(user, collection) {
 await db.collection(collection).add({ ...user, savedAt: new Date()}).then(item => setItem(item.id))
}