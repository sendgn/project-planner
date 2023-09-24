import { ref } from 'vue';

const getProjects = () => {
  const projects = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const resp = await fetch('http://localhost:3000/projects');
      if (!resp.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await resp.json();
      projects.value = data;
    } catch (err) {
      error.value = err.message;
    }
  }

  return { projects, error, load };
}

export default getProjects;
