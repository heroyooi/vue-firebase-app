<template>
  <div class="post-list">
    <h2>📃 게시글 목록</h2>

    <form @submit.prevent="addPost" v-if="user" class="post-form">
      <textarea
        v-model="newPost"
        placeholder="내용을 입력하세요"
        rows="4"
        required
      />
      <button type="submit">등록하기</button>
    </form>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <div class="info">
          <strong>{{ post.email }}</strong>
          <small>{{ formatDate(post.createdAt) }}</small>
        </div>

        <img v-if="post.imageUrl" :src="post.imageUrl" class="post-image" />

        <p class="content">{{ post.content }}</p>

        <div class="actions" v-if="user?.uid === post.userId">
          <button @click="removePost(post.id)">삭제</button>
        </div>

        <CommentBox :postId="post.id" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user';
import { createPost, getAllPosts, deletePost } from '../libs/postService';
import CommentBox from '../components/CommentBox.vue';

export default {
  components: { CommentBox },
  setup() {
    const posts = ref([]);
    const newPost = ref('');
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const fetchPosts = async () => {
      posts.value = await getAllPosts();
    };

    const addPost = async () => {
      if (!user.value || !newPost.value.trim()) return;
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
  max-width: 700px;
  margin: 60px auto;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #2c3e50;
  }

  .post-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;

    textarea {
      padding: 12px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 6px;
      resize: vertical;
    }

    button {
      align-self: flex-end;
      padding: 8px 16px;
      background-color: #42b883;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: #36996e;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      border: 1px solid #ddd;
      padding: 16px;
      margin-bottom: 20px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      .info {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #888;
        margin-bottom: 6px;
      }

      .content {
        font-size: 16px;
        margin: 10px 0;
        white-space: pre-wrap;
      }

      .actions {
        text-align: right;
        margin-bottom: 8px;

        button {
          padding: 6px 12px;
          background-color: #f66;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background-color: #d33;
          }
        }
      }

      .post-image {
        width: 100%;
        border-radius: 6px;
        margin: 10px 0;
        object-fit: cover;
      }
    }
  }
}
</style>
