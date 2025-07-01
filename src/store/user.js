import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../libs/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isReady = ref(false);

  const initAuth = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser;
        isReady.value = true;
        resolve();
      });
    });
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  return { user, isReady, initAuth, logout };
});
