import { createSlice } from "@reduxjs/toolkit";

import { redirect } from "react-router-dom";

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

        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        window.location = "/";
      },
      prepare: (taskData) => {
        return {payload: taskData};
      }
    },

    updateTask: {
      reducer: (state, action) => {
        let targetTaskIndex = state.tasks.findIndex(task => task.id === action.payload.taskData.id);
        state.tasks[targetTaskIndex] = action.payload.taskData;

        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        window.location = "/";
      },
      prepare: (taskData) => {
        return {payload: {taskData}};
      }
    },

    completeTask: {
      reducer: (state, action) => {
        let targetTaskIndex = state.tasks.findIndex(task => task.id === action.payload);
        state.tasks[targetTaskIndex].status = "finished";

        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        window.location = "/";
      },
      prepare: (id) => {
        return {payload: id};
      }
    },

    deleteTask: {
      reducer: (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);

        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        window.location = "/";
      },
      prepare: (id) => {
        return {payload: id};
      }
    }
  },
  selectors: {
    allTasks: (state) => state.tasks,
    taskById: (state, id) => state.tasks.find(task => task.id === id),
    tasksId: (state) => state.tasks.map(task => task.id),

    tasksByCategory: (state, category) => {
      let tasksByCategory = [];
      switch(category) {
        case "/opened": {
          tasksByCategory = state.tasks.filter(task => task.status === "not finished");
          break;
        }
        case "/closed": {
          tasksByCategory = state.tasks.filter(task => task.status === "finished");
          break;
        }
      }
      return tasksByCategory;
    },
    
    tasksByTimeStatus: (state, timeStatus) => {
      let tasksByTimeStatus = [];
      let date = new Date();
      date = date.toISOString().slice(0, 10).replaceAll("-", ".");

      switch (timeStatus) {
        case "running": {
          tasksByTimeStatus = state.tasks.filter(
            task => (task.status === "not finished" && task.finishDate >= date));
          break;
        }
        case "expired": {
          tasksByTimeStatus = state.tasks.filter(
            task => (task.status === "not finished" && task.finishDate < date));
          break;
        }
        default: {
          tasksByTimeStatus = state.tasks;
        }
      }

      return tasksByTimeStatus;
    },

    tasksByTitle: (state, filterText) => {
      if (!filterText) {
        return state.tasks;
      }

      const tasksByTitle = state.tasks.filter(
        task => task.description.toLowerCase().includes(filterText.toLowerCase()));

      return tasksByTitle;
    }
  }
})

export const {createTask, updateTask, completeTask, deleteTask} = tasksSlice.actions;
export const {allTasks, taskById, tasksId, tasksByCategory, tasksByTimeStatus, tasksByTitle} = tasksSlice.selectors;
export default tasksSlice.reducer;