<template>
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in projects" :key="project.id">
        <SingleProject :project="project" />
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import SingleProject from '@/components/SingleProject.vue';

export default {
  name: 'HomeView',
  components: { SingleProject },
  setup() {
    const store = useStore();
    const error = ref(null);
    
    store.dispatch('getProjects')
      .catch((err) => {
        error.value = err.message;
      });

    return {
      projects: computed(() => store.state.projects),
      error
    }
  }
}
</script>
