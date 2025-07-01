import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

const postsRef = collection(db, 'posts');

export const createPost = async (user, content, imageUrl = '') => {
  await addDoc(collection(db, 'posts'), {
    userId: user.uid,
    email: user.email,
    content,
    imageUrl,
    createdAt: serverTimestamp(),
  });
};

export async function getAllPosts() {
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deletePost(id) {
  return await deleteDoc(doc(postsRef, id));
}
