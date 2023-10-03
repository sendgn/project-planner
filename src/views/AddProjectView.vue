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
          id: store.state.projects.length + 1,
          title: title.value,
          details: details.value,
          complete: false
        });
        router.push('/');
      } catch (err) {
        console.log(err.message);
      }
    };

    return {
      title, details, handleSubmit
    }
  }
};
</script>
