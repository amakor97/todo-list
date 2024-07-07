import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import AddTaskForm from "../components/addTaskForm/AddTaskForm.js";
import TasksList from "../components/tasksList/TasksList.js";
import TasksPage from "../components/tasksPage/TasksPage.js";
import categoryLoader from "../components/tasksPage/TasksPage.js";
import { tasksLoader, tasksByCategoryLoader, tasksByStatusLoader } from "../components/tasksList/TasksList.js";
import { render } from "react-dom";
import { tasksLoaderImp } from "../App.js";

const routes = [
  {
    path: "/",
    element: <App/>,
    loader: tasksLoaderImp,
    children: [
      {
        index: true,
        element: <TasksList/>,
        loader: tasksLoader
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