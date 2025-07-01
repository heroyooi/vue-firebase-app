import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../libs/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  // 로그인 상태 변경 감지
  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      console.log('🔐 로그인됨:', firebaseUser?.displayName, firebaseUser?.email)
    });
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  return {
    user,
    initAuth,
    logout,
  };
});
