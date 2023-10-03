<template>
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="toggleDetails">{{ project.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'edit-project', params: { id: project.id } }">
          <span class="material-icons">edit</span>
        </router-link>
        <span @click="deleteProject" class="material-icons">delete</span>
        <span @click="toggleComplete" class="material-icons tick">done</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SingleProject',
  props: ['project'],
  setup(props) {
    const store = useStore();
    const showDetails = ref(false);

    const toggleDetails = () => {
      showDetails.value = !showDetails.value;
    };

    const toggleComplete = async () => {
      try {
        await store.dispatch('complete', props.project);
      } catch (err) {
        console.log(err.message);
      }
    };

    const deleteProject = async () => {
      try {
        await store.dispatch('delete', props.project);
      } catch (err) {
        console.log(err.message);
      }
    };

    return {
      showDetails,
      toggleDetails,
      toggleComplete,
      deleteProject
    };
  }
}
</script>

<style scoped>
  h3 {
    cursor: pointer;
  }
  .project {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #e90074;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .material-icons {
    font-size: 24px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
  }
  .material-icons:hover {
    color: #777;
  }
  /* Completed projects */
  .project.complete {
    border-left: 4px solid #00ce89;
  }
  .project.complete .tick {
    color: #00ce89;
  }
</style>