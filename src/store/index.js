import { createStore } from 'vuex';

const uri = 'http://localhost:3000/projects/';

const store = createStore({
  state: {
    projects: []
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
      console.log('projects state changed:', state.projects);
    }
  },
  actions: {
    async get(context) {
      const resp = await fetch(uri);
      if (resp.ok) {
        const data = await resp.json();
        context.commit('setProjects', data);
      } else {
        throw new Error('Could not get projects');
      }
    },
    async delete(context, { id }) {
      const resp = await fetch(uri + id, {
        method: 'DELETE'
      });
      if (resp.ok) {
        const data = store.state.projects.filter((p) => p.id !== id);
        context.commit('setProjects', data);
      } else {
        throw new Error('Could not delete project');
      }
    }
  }
});

export default store;
