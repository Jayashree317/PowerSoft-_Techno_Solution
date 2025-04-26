import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (task) => ({
        payload: {
          id: nanoid(),
          status: 'Need to Do', 
          ...task,
        },
      }),
    },
    updateTask: (state, action) => {
      const index = state.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    moveTask: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.find(t => t.id === taskId);
      if (task) task.status = status;
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
