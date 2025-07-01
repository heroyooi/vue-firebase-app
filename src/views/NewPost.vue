<template>
  <div class="new-post">
    <h2>📝 새 글 작성</h2>

    <form @submit.prevent="submit">
      <textarea
        v-model="content"
        placeholder="내용을 입력하세요"
        rows="6"
        required
      ></textarea>

      <button type="submit">등록하기</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../store/user';
import { createPost } from '../libs/postService';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const content = ref('');
    const userStore = useUserStore();
    const router = useRouter();

    const submit = async () => {
      if (!content.value.trim()) return;
      await createPost(userStore.user, content.value);
      content.value = '';
      router.push('/posts');
    };

    return { content, submit };
  },
};
</script>

<style scoped lang="scss">
.new-post {
  max-width: 600px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    textarea {
      padding: 12px;
      font-size: 16px;
      resize: vertical;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button {
      align-self: flex-end;
      padding: 10px 20px;
      background-color: #42b883;
      color: white;
      font-size: 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background-color: #36996e;
      }
    }
  }
}
</style>
