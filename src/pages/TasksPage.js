import { Outlet } from "react-router-dom";
import TasksList from "../components/tasksList/TasksList";

import { useContext } from "react";
import { PageSettings } from "../pageSettings";
import { useLoaderData } from "react-router-dom";

import { getTasks, getTasksByCategory, getTasksByTimeStatus, getTasksByTitle } from "../requests/tasksRequests";

export async function tasksLoader() {
  const tasks = await getTasks();
  return {tasks};
}



export async function tasksByCategoryLoader({request}) {
  const url = new URL(request.url);
  let tasks = await getTasksByCategory(url.pathname);

  return {tasks};
}

export async function tasksByStatusLoader({params}) {
  const tasks = await getTasksByTimeStatus(params.status);
  return {tasks};
}


export async function tasksByTitleLoader({request}) {
  const url = new URL(request.url);
  const taskFilter = url.searchParams.get("task_filter");
  const tasks = await getTasksByTitle(taskFilter);
  return {tasks};
}


export default function TasksPage() {
  
  const contextData = useContext(PageSettings);

  const tasks = contextData.tasks;
  const dispatch = contextData.dispatch;
  const filterText = "";
  const fTask = tasks[0];
  console.log(fTask);

  console.log(contextData);

  //const {tasks} = useLoaderData();
  console.log(tasks);

  return (
    <PageSettings.Provider value={{tasks, fTask, filterText, dispatch}}>
      <TasksList/>
    </PageSettings.Provider>
  )
}