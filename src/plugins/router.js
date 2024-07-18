import { createBrowserRouter } from "react-router-dom";
import App, { tasksLoaderComplexFromLs } from "../App.js";
import TasksPage, { tasksByCategoryLoader, tasksByStatusLoader, tasksByTitleLoader } from "../pages/TasksPage.js";
import AddTaskPage, { createAction, idsLoader } from "../pages/AddTaskPage.js";
import UpdateTaskPage, { taskByIdLoader, updateAction} from "../pages/UpdateTaskPage.js";
import { completeTaskByIdAction } from "../components/tasksList/TasksList.js";

const routes = [
  {
    path: "/",
    element: <App/>,
    //loader: tasksLoaderComplexFromLs,
    //action: completeTaskByIdAction,
    children: [
      {
        index: true,
        element: <TasksPage/>,
        //loader: tasksByTitleLoader,
        //action: completeTaskByIdAction
      },
      {
        path: "/opened",
        element: <TasksPage/>,
        //loader: tasksByCategoryLoader,
        action: completeTaskByIdAction
      },
      {
        path: "/opened/:status",
        element: <TasksPage/>,
        //loader: tasksByStatusLoader,
        action: completeTaskByIdAction
      },
      {
        path: "/closed",
        element: <TasksPage/>,
        //loader: tasksByCategoryLoader,
        action: completeTaskByIdAction
      },
      {
        path: "/add",
        element: <AddTaskPage/>,
        //loader: idsLoader, //??????
        action: createAction
      },
      {
        path: "/:taskId",
        children: [
          {
            path: "/:taskId/update",
            element: <UpdateTaskPage/>,
            //loader: taskByIdLoader,
            action: updateAction
          }
        ]
      }
    ]
  }
]

export const router = createBrowserRouter(routes);