import { createBrowserRouter } from "react-router-dom";
import App, { tasksLoaderFromLs } from "../App.js";
import AddTaskForm from "../components/addTaskForm/AddTaskForm.js";
import TasksList from "../components/tasksList/TasksList.js";
import { tasksLoader, tasksByCategoryLoader, tasksByStatusLoader, tasksByTitleLoader } from "../components/tasksList/TasksList.js";
import { tasksLoaderImp, tasksLoaderComplexFromLs } from "../App.js";
import TasksPage from "../pages/TasksPage.js";
import AddTaskPage, { createAction, idsLoader } from "../pages/AddTaskPage.js";
import UpdateTaskPage from "../pages/UpdateTaskPage.js";
import { taskByIdLoader } from "../pages/UpdateTaskPage.js";

const routes = [
  {
    path: "/",
    element: <App/>,
    loader: tasksLoaderComplexFromLs,
    children: [
      {
        index: true,
        element: <TasksPage/>,
        loader: tasksByTitleLoader,
      },
      {
        path: "/opened",
        element: <TasksPage/>,
        loader: tasksByCategoryLoader,
      },
      {
        path: "/opened/:status",
        element: <TasksPage/>,
        loader: tasksByStatusLoader,
      },
      {
        path: "/closed",
        element: <TasksPage/>,
        loader: tasksByCategoryLoader,
      },
      {
        path: "/add",
        element: <AddTaskPage/>,
        loader: idsLoader,
        action: createAction
      },
      {
        path: "/:taskId",
        children: [
          {
            path: "/:taskId/update",
            element: <UpdateTaskPage/>,
            loader: taskByIdLoader
          }
        ]
      }
    ]
  }
]

export const router = createBrowserRouter(routes);