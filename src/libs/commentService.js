import { db } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';

// 댓글 실시간 구독
export function listenComments(postId, callback) {
  const q = query(
    collection(db, 'posts', postId, 'comments'),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });
}

// 댓글 추가
export async function addComment(postId, user, content) {
  const ref = collection(db, 'posts', postId, 'comments');
  await addDoc(ref, {
    userId: user.uid,
    email: user.email,
    content,
    createdAt: new Date(),
  });
}

// 댓글 삭제
export async function deleteComment(postId, commentId) {
  const ref = doc(db, 'posts', postId, 'comments', commentId);
  await deleteDoc(ref);
}
