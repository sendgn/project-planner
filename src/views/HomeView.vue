<template>
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in projects" :key="project.id">
        <SingleProject :project="project" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import SingleProject from '@/components/SingleProject.vue';
import NavBar from '@/components/NavBar.vue';


export default {
  name: 'HomeView',
  components: { SingleProject },
  setup() {
    const store = useStore();
    
    watchEffect(async () => {
      try {
        await store.dispatch('get');
      } catch (err) {
        console.log(err.message);
      }
    })

    return { projects: computed(() => store.state.projects) };
  }
}
</script>
