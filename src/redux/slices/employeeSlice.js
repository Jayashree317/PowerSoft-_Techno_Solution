import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('employees')) || [];
};

const saveToLocalStorage = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState: loadFromLocalStorage(),  
  reducers: {
    addEmployee: {
      reducer: (state, action) => {
        state.push(action.payload);
        saveToLocalStorage(state);        
      },
      prepare: (data) => ({
        payload: {
          id: nanoid(),
          ...data,
        },
      }),
    },
    updateEmployee: (state, action) => {
      const index = state.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveToLocalStorage(state);        
      }
    },
    deleteEmployee: (state, action) => {
      const newState = state.filter(emp => emp.id !== action.payload);
      saveToLocalStorage(newState);        
      return newState;
    },
    setEmployees: (state, action) => {
      saveToLocalStorage(action.payload); 
      return action.payload;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
