import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../pages/tasksSlice.js";

const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});

export default store;