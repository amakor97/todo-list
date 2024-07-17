import { createSlice } from "@reduxjs/toolkit";

import { tasks } from "../requests/tasksRequests";

const initialState = {
  tasks: JSON.parse(window.localStorage.getItem("tasks")) ? JSON.parse(window.localStorage.getItem("tasks")) : tasks
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: (taskData) => {
        return {payload: {taskData}};
      }
    },

    updateTask: {
      reducer: (state, action) => {
        let targetTaskIndex = state.tasks.findIndex(task => task.id === action.payload.taskData.id);
        state.tasks[targetTaskIndex] = action.payload.taskData;
      },
      prepare: (taskData) => {
        return {payload: {taskData}};
      }
    },

    completeTask: {
      reducer: (state, action) => {
        let targetTaskIndex = state.tasks.findIndex(task => task.id === action.payload);
        state.tasks[targetTaskIndex].status = "finished";
      },
      prepare: (id) => {
        return {payload: {id}};
      }
    },

    deleteTask: {
      reducer: (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      },
      prepare: (id) => {
        return {payload: {id}};
      }
    }
  },
  selectors: {
    allTasks: (state) => state.tasks,
    findById: (state, id) => state.tasks.find(task => task.id === id)
  }
})

export const {createTask, updateTask, completeTask, deleteTask} = tasksSlice.actions;
export const {allTasks, findById} = tasksSlice.selectors;
export default tasksSlice.reducer;