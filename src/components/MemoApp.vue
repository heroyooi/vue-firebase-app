<template>
  <div class="container">
    <h2>📝 메모장</h2>
    <input v-model="newMemo" placeholder="메모 입력" />
    <button @click="addMemo">추가</button>

    <ul>
      <li v-for="memo in memos" :key="memo.id">
        {{ memo.text }}
        <button @click="deleteMemo(memo.id)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const newMemo = ref('');
const memos = ref([]);

const memosRef = collection(db, 'memos');

const addMemo = async () => {
  if (!newMemo.value) return;
  await addDoc(memosRef, {
    text: newMemo.value,
    createdAt: new Date(),
  });
  newMemo.value = '';
};

const deleteMemo = async (id) => {
  await deleteDoc(doc(db, 'memos', id));
};

onMounted(() => {
  const q = query(memosRef, orderBy('createdAt', 'desc'));
  onSnapshot(q, (snapshot) => {
    memos.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
});
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem;

  h2 {
    color: $text-dark;
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background: $primary;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;

    &:hover {
      background: #369870;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 0.5rem 0;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>