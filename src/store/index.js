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
    },
    updateProjects(state, { project, mutate }) {
      state.projects.find((p) => p.id === project.id);
      mutate(project);
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
    async delete(context, project) {
      const resp = await fetch(uri + project.id, {
        method: 'DELETE'
      });
      if (resp.ok) {
        const projects = store.state.projects.filter(
          (p) => p.id !== project.id
        );
        context.commit('setProjects', projects);
      } else {
        throw new Error('Could not delete project');
      }
    },
    async complete(context, project) {
      const resp = await fetch(uri + project.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complete: !project.complete })
      });
      if (resp.ok) {
        const mutate = (p) => p.complete = !p.complete;
        context.commit('updateProjects', { project, mutate });
      } else {
        throw new Error('Could not update project');
      }
    }
  }
});

export default store;
