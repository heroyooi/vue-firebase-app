<template>
  <div class="login-view">
    <h2>로그인 / 회원가입</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="이메일" required />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        required
      />
      <div>
        <button @click="mode = 'login'">로그인</button>
        <button @click="mode = 'signup'">회원가입</button>
      </div>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../libs/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const mode = ref('login'); // 또는 'signup'
    const error = ref('');

    const handleSubmit = async () => {
      error.value = '';
      try {
        if (mode.value === 'signup') {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
          console.log('회원가입 성공:', userCredential.user);
        } else {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
          console.log('로그인 성공:', userCredential.user);
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    return { email, password, mode, error, handleSubmit };
  },
};
</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input {
  padding: 8px;
  font-size: 16px;
}
button {
  margin-right: 10px;
  padding: 6px 12px;
}
</style>
