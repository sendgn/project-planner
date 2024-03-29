import { createStore } from 'vuex';

const uri = 'http://localhost:3000/projects/';

const store = createStore({
  state: {
    projects: [],
    filter: 'all'
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
      console.log('projects state changed:', state.projects);
    },
    updateProjects(state, { project, mutate }) {
      state.projects.find((p) => p.id === project.id);
      mutate(project);
    },
    addProject(state, payload) {
      state.projects.push(payload);
    },
    setFilter(state, payload) {
      state.filter = payload;
      console.log('filter state changed:', state.filter);
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
        throw new Error('Could not complete project');
      }
    },
    async add(context, { id, title, details, complete }) {
      const resp = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, details, complete })
      });
      if (resp.ok) {
        context.commit('addProject', { id, title, details, complete });
      } else {
        throw new Error('Could not add project');
      }
    },
    changeFilter(context, payload) {
      context.commit('setFilter', payload);
    }
  }
});

export default store;
