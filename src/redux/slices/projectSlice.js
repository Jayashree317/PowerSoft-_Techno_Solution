import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  projects: JSON.parse(localStorage.getItem('projects')) || [],
};

const saveToLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: {
      reducer: (state, action) => {
        state.projects.push(action.payload);
        saveToLocalStorage(state.projects);  
      },
      prepare: (project) => ({
        payload: {
          id: nanoid(),
          ...project,
        },
      }),
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        saveToLocalStorage(state.projects);  // ✅ Save after updating
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      saveToLocalStorage(state.projects);  
    },
  },
});

export const { addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
