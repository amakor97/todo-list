import TasksList from "../components/tasksList/TasksList";

import { useState } from "react";
import { PageSettings } from "../pageSettings";
import { useLoaderData } from "react-router-dom";

import { getTasksByCategory, getTasksByTimeStatus, 
  getTasksByTitle } from "../requests/tasksRequests";


const sortOptions = [
  {id: 1, name: "Select sort", value: "none"},
  {id: 2, name: "Start date", value: "start"},
  {id: 3, name: "Finish date", value: "finish"}, 
  {id: 4, name: "P-ants number", value: "number"}
];


function sortTasksByDate(type, taskA, taskB) {
  let finishA = undefined;
  let finishB = undefined;
  switch(type) {
    case "start": {
      finishA = Date.parse(taskA.startDate);
      finishB = Date.parse(taskB.startDate);
      break;
    }
    case "finish": {
      finishA = Date.parse(taskA.finishDate);
      finishB = Date.parse(taskB.finishDate);
      break;
    }
    default: {
      break;
    }
  }
  return finishA - finishB;
}


function sortByParticipantsNumber(taskA, taskB) {
  return taskA.participants.length - taskB.participants.length;
}


export async function tasksByCategoryLoader({request}) {
  const url = new URL(request.url);
  let tasks = await getTasksByCategory(url.pathname);
  return tasks;
}

export async function tasksByStatusLoader({params}) {
  const tasks = await getTasksByTimeStatus(params.status);
  return tasks;
}


export async function tasksByTitleLoader({request}) {
  const url = new URL(request.url);
  const taskFilter = url.searchParams.get("task_filter");
  const tasks = await getTasksByTitle(taskFilter);
  return tasks;
}


function sortTasks(defTasksArr, tasksArr, sortType) {
  switch(sortType) {
    case "start":
    case "finish": {
      return tasksArr.sort((taskA, taskB) => sortTasksByDate(sortType, taskA, taskB));
    }
    case "number": {
      return tasksArr.sort((taskA, taskB) => sortByParticipantsNumber(taskA, taskB));
    }
    default: return defTasksArr;
  }
}


export default function TasksPage() {
  const [sortType, setSortType] = useState(sortOptions[0].value);
  const tmpTasks = useLoaderData();
  const srcTasks = JSON.parse(JSON.stringify(tmpTasks));

  let srcTasks2 = JSON.parse(JSON.stringify(srcTasks));
  srcTasks2 = sortTasks(tmpTasks, srcTasks2, sortType);

  return (
    <PageSettings.Provider value={{srcTasks, srcTasks2, setSortType}}>
      <TasksList/>
    </PageSettings.Provider>
  )
}