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
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { deleteImage } from './uploadService';

const postsRef = collection(db, 'posts');

export const createPost = async (user, content, imageUrls = []) => {
  await addDoc(collection(db, 'posts'), {
    userId: user.uid,
    email: user.email,
    content,
    imageUrls,
    createdAt: serverTimestamp(),
  });
};

export async function getAllPosts() {
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export const deletePost = async (id, currentUser) => {
  const postRef = doc(db, 'posts', id);
  const snap = await getDoc(postRef);

  if (!snap.exists()) {
    throw new Error('문서가 존재하지 않습니다');
  }

  const data = snap.data();
  if (data.userId !== currentUser?.uid) {
    throw new Error('권한이 없습니다');
  }

  // 여러 이미지 삭제
  if (Array.isArray(data.imageUrls)) {
    await Promise.all(data.imageUrls.map(deleteImage));
  }

  await deleteDoc(postRef);
};

export const updatePost = async (id, content) => {
  const postRef = doc(db, 'posts', id);
  await updateDoc(postRef, { content });
};