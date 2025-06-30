<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">홈</RouterLink> |
        <RouterLink to="/login">로그인</RouterLink> |
        <span v-if="user">{{ user.email }} 님</span>
        <button v-if="user" @click="logout">로그아웃</button>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import { useUserStore } from './store/user';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const logout = () => {
      userStore.logout();
    };

    return { user, logout };
  },
};
</script>

<style>
/* 동일 */
</style>
