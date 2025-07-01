<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import { useUserStore } from './store/user';
import { storeToRefs } from 'pinia';
import Header from './components/Header.vue';

export default {
  components: { Header },
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
