<template>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input type="text" v-model="title" required>
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <button>Add Project</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const title = ref('');
    const details = ref('');
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await store.dispatch('add', {
          title: title.value,
          details: details.value,
          complete: false
        });
        router.push('/');
      } catch (err) {
        console.log(err.message);
      }
    }

    return {
      title, details, handleSubmit
    }
  }
};
</script>

<style scoped>
  form {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
  label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
  }
  input {
    padding: 10px;
    border: 1px solid transparent;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    resize: vertical;
  }
  input:focus, textarea:focus,
  input:active, textarea:active {
    border: 1px solid #00ce89;
    outline: none;
  }
  form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
