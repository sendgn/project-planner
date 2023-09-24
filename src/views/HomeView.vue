<template>
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in projects" :key="project.id">
        <SingleProject :project="project" />
      </div>
    </div>
  </div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import getProjects from '@/composables/getProjects';
import SingleProject from '@/components/SingleProject.vue'

export default {
  name: 'HomeView',
  components: { SingleProject },
  setup() {
    const { projects, error, load } = getProjects();

    load();

    return { projects, error };
  }
}
</script>
