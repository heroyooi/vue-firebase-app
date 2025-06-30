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
      <div class="buttons">
        <button type="submit" @click="mode = 'login'">로그인</button>
        <button type="submit" @click="mode = 'signup'">회원가입</button>
      </div>
    </form>

    <div class="social-login">
      <p>또는 소셜 로그인</p>
      <button @click="loginWithGoogle">Google 로그인</button>
      <button @click="loginWithGitHub">GitHub 로그인</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth, googleProvider, githubProvider } from '../libs/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const mode = ref('login')
    const error = ref('')

    const handleSubmit = async () => {
      error.value = ''
      try {
        if (mode.value === 'signup') {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          )
          console.log('회원가입 성공:', userCredential.user)
        } else {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
          )
          console.log('로그인 성공:', userCredential.user)
        }
      } catch (err) {
        error.value = err.message
      }
    }

    const loginWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider)
        console.log('✅ Google 로그인 성공')
      } catch (err) {
        error.value = err.message
      }
    }

    const loginWithGitHub = async () => {
      try {
        await signInWithPopup(auth, githubProvider)
        console.log('✅ GitHub 로그인 성공')
      } catch (err) {
        error.value = err.message
      }
    }

    return {
      email,
      password,
      mode,
      error,
      handleSubmit,
      loginWithGoogle,
      loginWithGitHub,
    }
  },
}
</script>

<style scoped lang="scss">
.login-view {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .buttons {
    display: flex;
    justify-content: space-between;

    button {
      flex: 1;
      padding: 10px;
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .social-login {
    margin-top: 20px;
    text-align: center;

    p {
      margin-bottom: 10px;
      font-weight: bold;
    }

    button {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      font-size: 15px;
      border: 1px solid #ccc;
      cursor: pointer;
    }
  }

  .error {
    color: red;
    font-weight: bold;
    text-align: center;
  }
}
</style>
