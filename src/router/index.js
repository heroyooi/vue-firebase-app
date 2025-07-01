// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import PostList from '../views/PostList.vue';
import NewPost from '../views/NewPost.vue';

import { useUserStore } from '../store/user';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/posts', component: PostList },
  { path: '/posts/new', component: NewPost, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ 글로벌 라우터 가드
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 로그인 상태가 로딩되지 않았다면 기다림
  if (!userStore.isReady) {
    await userStore.initAuth();
  }

  // 인증이 필요한 페이지인데 로그인 안 되어 있으면 /login
  if (to.meta.requiresAuth && !userStore.user) {
    alert('로그인이 필요합니다.');
    return next('/login');
  }

  return next();
});

export default router;
