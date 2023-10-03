<template>
  <form @submit.prevent="handleSubmit" v-if="project">
    <label>Title:</label>
    <input type="text" v-model="project.title" required>
    <label>Details:</label>
    <textarea v-model="project.details" required></textarea>
    <button>Update Project</button>
  </form>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const uri = `http://localhost:3000/projects/${props.id}`;
    const router = useRouter();
    const project = ref(null);

    watchEffect(async () => {
      try {
        const resp = await fetch(uri);
        if (!resp.ok) {
          throw new Error('Could not load project');
        }
        project.value = await resp.json();
      } catch (err) {
        console.log(err.message);
      }
    });

    const handleSubmit = async () => {
      try {
        const resp = await fetch(uri, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: project.value.title,
            details: project.value.details
          })
        });
        if (!resp.ok) {
          throw new Error('Could not update project');
        }
        router.push('/');
      } catch (err) {
        console.log(err.message);
      }
    }

    return { project, handleSubmit };
  }
}
</script>
