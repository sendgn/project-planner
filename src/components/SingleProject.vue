<template>
  <div class="project">
    <div class="actions">
      <h3 @click="handleToggleDetails">{{ project.title }}</h3>
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
  .project {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #e90074;
  }
  h3 {
    cursor: pointer;
  }
</style>