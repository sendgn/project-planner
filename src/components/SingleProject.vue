<template>
  <div class="project">
    <div class="actions">
      <h3 @click="handleToggleDetails">{{ project.title }}</h3>
      <div class="icons">
        <span class="material-icons">edit</span>
        <span class="material-icons">delete</span>
        <span class="material-icons">done</span>

      </div>
    </div>
    <div v-if="isDetailsShowing" class="details">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['project'],
  setup() {
    const isDetailsShowing = ref(false);

    const handleToggleDetails = () => {
      isDetailsShowing.value = !isDetailsShowing.value;
    }

    return { isDetailsShowing, handleToggleDetails };
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