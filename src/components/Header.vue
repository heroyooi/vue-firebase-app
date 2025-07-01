<template>
  <header class="main-header">
    <nav>
      <RouterLink to="/">홈</RouterLink>
      <RouterLink v-if="!user" to="/login">로그인</RouterLink>
      <RouterLink to="/posts">게시판</RouterLink>
      <span v-if="user">{{ user.email }}님</span>
      <button v-if="user" @click="logout">로그아웃</button>
    </nav>
  </header>
</template>

<script>
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const logout = () => userStore.logout();

    return { user, logout };
  },
};
</script>

<style scoped lang="scss">
.main-header {
  background: #42b883;
  color: white;
  padding: 12px 20px;

  nav {
    display: flex;
    gap: 12px;
    align-items: center;

    a {
      color: white;
      text-decoration: none;
    }

    span {
      margin-left: auto;
      font-weight: bold;
    }

    button {
      margin-left: 10px;
      background: white;
      color: #42b883;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
