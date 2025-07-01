<template>
  <div class="comment-box">
    <h3>💬 댓글</h3>

    <form v-if="user" @submit.prevent="submitComment">
      <input v-model="newComment" placeholder="댓글 작성..." />
      <button type="submit">등록</button>
    </form>

    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.email }}</strong>
        <span>{{ formatDate(comment.createdAt) }}</span>
        <p>{{ comment.content }}</p>
        <button
          v-if="user?.uid === comment.userId"
          @click="removeComment(comment.id)"
        >
          삭제
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
import {
  listenComments,
  addComment,
  deleteComment,
} from '../libs/commentService';

export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const comments = ref([]);
    const newComment = ref('');
    const { user } = storeToRefs(useUserStore());
    let unsubscribe = null;

    onMounted(() => {
      unsubscribe = listenComments(props.postId, (data) => {
        comments.value = data;
      });
    });

    onUnmounted(() => {
      if (unsubscribe) unsubscribe();
    });

    const submitComment = async () => {
      if (!user.value || !newComment.value.trim()) return;
      await addComment(props.postId, user.value, newComment.value);
      newComment.value = '';
    };

    const removeComment = async (id) => {
      await deleteComment(props.postId, id);
    };

    const formatDate = (ts) => {
      const d = new Date(ts?.seconds ? ts.seconds * 1000 : ts);
      return d.toLocaleString();
    };

    return {
      comments,
      newComment,
      user,
      submitComment,
      removeComment,
      formatDate,
    };
  },
};
</script>

<style scoped lang="scss">
.comment-box {
  border-top: 1px solid #ddd;
  margin-top: 20px;
  padding-top: 16px;

  form {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;

    input {
      flex: 1;
      padding: 8px;
    }

    button {
      padding: 8px 12px;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      border: 1px solid #eee;
      padding: 10px;
      border-radius: 6px;

      strong {
        color: #333;
      }

      span {
        font-size: 12px;
        margin-left: 10px;
        color: #888;
      }

      p {
        margin: 6px 0;
      }

      button {
        background: #f55;
        color: white;
        border: none;
        padding: 4px 8px;
        cursor: pointer;
      }
    }
  }
}
</style>
