<template>
  <div>
    <div v-if="user">
      <p>👋 {{ user.displayName }}</p>
      <button @click="logout">로그아웃</button>
    </div>
    <div v-else>
      <button @click="loginWithGoogle">Google 로그인</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth, provider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const user = ref(null);

const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error('로그인 오류:', err);
  }
};

const logout = async () => {
  await signOut(auth);
};

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });
});
</script>
