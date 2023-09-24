<template>
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in projects" :key="project.id">
        <p>{{ project.title }}</p>
        
      </div>
    </div>
  </div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import getProjects from '@/composables/getProjects';

export default {
  name: 'HomeView',
  components: {},
  setup() {
    const { projects, error, load } = getProjects();

    load();

    return { projects, error };
  }
}
</script>
