<template>
  <div class="post-list">
    <h2>게시글 목록</h2>
    <form @submit.prevent="addPost" v-if="user">
      <textarea v-model="newPost" placeholder="내용을 입력하세요" required />
      <button type="submit">등록</button>
    </form>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <div class="info">
          <strong>{{ post.email }}</strong>
          <small>{{ formatDate(post.createdAt) }}</small>
        </div>
        <p>{{ post.content }}</p>
        <button v-if="user?.uid === post.userId" @click="removePost(post.id)">
          삭제
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/user';
import { createPost, getAllPosts, deletePost } from '../libs/postService';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const posts = ref([]);
    const newPost = ref('');
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const fetchPosts = async () => {
      posts.value = await getAllPosts();
    };

    const addPost = async () => {
      if (!user.value) return;
      await createPost(user.value, newPost.value);
      newPost.value = '';
      await fetchPosts();
    };

    const removePost = async (id) => {
      await deletePost(id);
      await fetchPosts();
    };

    const formatDate = (ts) => {
      if (!ts) return '';
      const d = new Date(ts.seconds ? ts.seconds * 1000 : ts);
      return d.toLocaleString();
    };

    onMounted(fetchPosts);

    return { posts, newPost, addPost, removePost, user, formatDate };
  },
};
</script>

<style scoped lang="scss">
.post-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;

  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    resize: vertical;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      border: 1px solid #ccc;
      padding: 12px;
      margin-bottom: 12px;
      border-radius: 6px;

      .info {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #666;
      }

      p {
        margin: 10px 0;
        font-size: 16px;
      }

      button {
        background: #f66;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
