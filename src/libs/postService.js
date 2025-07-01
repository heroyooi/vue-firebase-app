import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';

const postsRef = collection(db, 'posts');

export async function createPost(user, content) {
  return await addDoc(postsRef, {
    userId: user.uid,
    email: user.email,
    content,
    createdAt: new Date(),
  });
}

export async function getAllPosts() {
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deletePost(id) {
  return await deleteDoc(doc(postsRef, id));
}
