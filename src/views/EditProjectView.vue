<template>
  <form>
    <label>Title:</label>
    <input type="text" v-model="title" required>
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <button>Update Project</button>
  </form>
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    const title = ref('');
    const details = ref('');
    const uri = `http://localhost:3000/projects/${props.id}`;

    watchEffect(async () => {
      try {
        const resp = await fetch(uri);
        if (!resp.ok) {
          throw new Error('Could not load project');
        }
        const data = await resp.json();
        title.value = data.title;
        details.value = data.details;
      } catch (err) {
        console.log(err.message);
      }
    });

    return { title, details };
  }
}
</script>
