import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import PostList from '../views/PostList.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/posts', name: 'Posts', component: PostList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
