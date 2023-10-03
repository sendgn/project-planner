<template>
  <div class="home">
    <FilterNav />
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject :project="project" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import SingleProject from '@/components/SingleProject.vue';
import FilterNav from '@/components/FilterNav.vue';

export default {
  name: 'HomeView',
  components: { SingleProject, FilterNav },
  setup() {
    const store = useStore();
    
    watchEffect(async () => {
      try {
        await store.dispatch('get');
      } catch (err) {
        console.log(err.message);
      }
    });

    return {
      projects: computed(() => store.state.projects),
      filteredProjects: computed(() => {
        const projects = store.state.projects;
        const filter = store.state.filter;

        switch (filter) {
          case 'completed':
            return projects.filter((p) => p.complete);
          case 'ongoing':
            return projects.filter((p) => !p.complete);
        }

        return projects;
      })
    };
  }
}
</script>
