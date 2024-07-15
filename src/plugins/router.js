import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import AddTaskForm from "../components/addTaskForm/AddTaskForm.js";
import TasksList from "../components/tasksList/TasksList.js";
import { tasksByCategoryLoader, tasksByStatusLoader, tasksByTitleLoader } from "../pages/TasksPage.js";
import { tasksLoaderComplexFromLs } from "../App.js";
import TasksPage from "../pages/TasksPage.js";
import AddTaskPage, { createAction, idsLoader } from "../pages/AddTaskPage.js";
import UpdateTaskPage from "../pages/UpdateTaskPage.js";
import { taskByIdLoader } from "../pages/UpdateTaskPage.js";
import { updateTask } from "../requests/tasksRequests.js";
import { updateAction } from "../pages/UpdateTaskPage.js";
import { completeTaskByIdAction } from "../components/tasksList/TasksList.js";

const routes = [
  {
    path: "/",
    element: <App/>,
    loader: tasksLoaderComplexFromLs,
    action: completeTaskByIdAction,
    children: [
      {
        index: true,
        element: <TasksPage/>,
        loader: tasksByTitleLoader,
        action: completeTaskByIdAction
      },
      {
        path: "/opened",
        element: <TasksPage/>,
        loader: tasksByCategoryLoader,
        action: completeTaskByIdAction
      },
      {
        path: "/opened/:status",
        element: <TasksPage/>,
        loader: tasksByStatusLoader,
        action: completeTaskByIdAction
      },
      {
        path: "/closed",
        element: <TasksPage/>,
        loader: tasksByCategoryLoader,
        action: completeTaskByIdAction
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
            loader: taskByIdLoader,
            action: updateAction
          }
        ]
      }
    ]
  }
]

export const router = createBrowserRouter(routes);