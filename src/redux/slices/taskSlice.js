import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
  };
  

  const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      addTask: {
        reducer: (state, action) => {
          state.tasks.push(action.payload); // ✅ access tasks array
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
        const index = state.tasks.findIndex(t => t.id === action.payload.id); // ✅
        if (index !== -1) state.tasks[index] = action.payload;
      },
      deleteTask: (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload); // ✅
      },
      moveTask: (state, action) => {
        const { taskId, status } = action.payload;
        const task = state.tasks.find(t => t.id === taskId); // ✅
        if (task) task.status = status;
      },
      setTaskStatus: (state, action) => {
        const { status, taskIds } = action.payload;
        taskIds.forEach(id => {
          const task = state.tasks.find(t => t.id === id); // ✅
          if (task) task.status = status;
        });
      },
    },
  });
  

export const { addTask, updateTask, deleteTask, moveTask, setTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
