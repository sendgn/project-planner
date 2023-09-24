<template>
  <div class="project">
    <div class="actions">
      <h3 @click="toggleDetails">{{ project.title }}</h3>
      <div class="icons">
        <span class="material-icons">edit</span>
        <span @click="deleteProject" class="material-icons">delete</span>
        <span class="material-icons">done</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>{{ project.details }}</p>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  props: ['project'],
  setup(props) {
    const store = useStore();
    const showDetails = ref(false);
    const error = ref(null);

    const toggleDetails = () => {
      showDetails.value = !showDetails.value;
    }

    const deleteProject = async () => {
      try {
        await store.dispatch('deleteProject', {
          id: props.project.id
        });
      } catch (err) {
        error.value = err.message;
      }
    }

    return {
      showDetails,
      toggleDetails,
      deleteProject,
      error
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
</style>