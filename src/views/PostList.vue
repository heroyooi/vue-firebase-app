<template>
  <div class="post-list">
    <h2>📃 게시글 목록</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <div class="info">
          <strong>{{ post.email }}</strong>
          <small>{{ formatDate(post.createdAt) }}</small>
        </div>

        <!-- 여러 이미지 표시 -->
        <div class="image-list" v-if="post.imageUrls && post.imageUrls.length">
          <img
            v-for="(url, index) in post.imageUrls"
            :key="index"
            :src="url"
            class="post-image"
          />
        </div>

        <div v-if="editingPostId === post.id">
          <textarea v-model="editedContent" rows="4" class="edit-input" />
          <button @click="saveEdit(post.id)">저장</button>
          <button @click="cancelEdit">취소</button>
        </div>
        <p v-else class="content">{{ post.content }}</p>

        <!-- 수정 & 삭제 버튼 -->
        <div class="actions" v-if="user?.uid === post.userId">
          <button @click="startEdit(post)">수정</button>
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
import { getAllPosts, deletePost, updatePost } from '../libs/postService';
import CommentBox from '../components/CommentBox.vue';

export default {
  components: { CommentBox },

  setup() {
    const posts = ref([]);
    const editingPostId = ref(null);
    const editedContent = ref('');
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const fetchPosts = async () => {
      posts.value = await getAllPosts();
    };

    const removePost = async (id) => {
      await deletePost(id, user.value);
      await fetchPosts();
    };

    const startEdit = (post) => {
      editingPostId.value = post.id;
      editedContent.value = post.content;
    };

    const cancelEdit = () => {
      editingPostId.value = null;
      editedContent.value = '';
    };

    const saveEdit = async (id) => {
      if (!editedContent.value.trim()) return;
      await updatePost(id, editedContent.value);
      editingPostId.value = null;
      await fetchPosts();
    };

    const formatDate = (ts) => {
      if (!ts) return '';
      const d = new Date(ts.seconds ? ts.seconds * 1000 : ts);
      return d.toLocaleString();
    };

    onMounted(fetchPosts);

    return {
      posts,
      removePost,
      user,
      formatDate,
      editingPostId,
      editedContent,
      startEdit,
      cancelEdit,
      saveEdit,
    };
  }

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

      .image-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 10px 0;

        .post-image {
          width: 100%;
          border-radius: 6px;
          object-fit: cover;
        }
      }
    }
  }

  .edit-input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

}
</style>
