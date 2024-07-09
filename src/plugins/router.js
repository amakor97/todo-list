import { createBrowserRouter } from "react-router-dom";
import App, { tasksLoaderFromLs } from "../App.js";
import AddTaskForm from "../components/addTaskForm/AddTaskForm.js";
import TasksList from "../components/tasksList/TasksList.js";
import { tasksLoader, tasksByCategoryLoader, tasksByStatusLoader, tasksByTitleLoader } from "../components/tasksList/TasksList.js";
import { tasksLoaderImp, tasksLoaderComplexFromLs } from "../App.js";

const routes = [
  {
    path: "/",
    element: <App/>,
    loader: tasksLoaderComplexFromLs,
    children: [
      {
        index: true,
        element: <TasksList/>,
        loader: tasksByTitleLoader
      },
      {
        path: "/opened",
        children: [
          {
            index: true,
            element: <TasksList/>,
            loader: tasksByCategoryLoader,
          },
          {
            path: ":status",
            element: <TasksList/>,
            loader: tasksByStatusLoader,
          }
        ]
      },
      {
        path: "/closed",
        element: <TasksList/>,
        loader: tasksByCategoryLoader,
      },
      {
        path: "/add",
        element: <AddTaskForm/>
      }
    ]
  }
]

export const router = createBrowserRouter(routes);