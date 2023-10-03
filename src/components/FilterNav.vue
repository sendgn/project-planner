<template>
  <nav class="filter-nav">
    <button
      @click="updateFilter('all')"
      :class="{ active: current === 'all' }"
    >View All</button>
    <button
      @click="updateFilter('completed')"
      :class="{ active: current === 'completed' }"
    >Completed</button>
    <button
      @click="updateFilter('ongoing')"
      :class="{ active: current === 'ongoing' }"
    >Ongoing</button>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const updateFilter = (by) => {
      store.dispatch('changeFilter', by);
    };

    return {
      updateFilter,
      current: computed(() => store.state.filter)
    };
  }
}
</script>
<style scoped>
  .filter-nav button {
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
  }
  .filter-nav button.active {
    color: #555;
  }
</style>