import { Outlet } from "react-router-dom";
import TasksList from "../components/tasksList/TasksList";

import { useContext } from "react";
import { PageSettings } from "../pageSettings";
import { useLoaderData } from "react-router-dom";

import { useReducer, useState } from "react";

import { getTasks, getTasksByCategory, getTasksByTimeStatus, getTasksByTitle } from "../requests/tasksRequests";

export async function tasksLoader() {
  const tasks = await getTasks();
  return {tasks};
}

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


function sortById(taskA, taskB) {
  return taskA.id - taskB.id;
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
  
  const [sortType, setSortType] = useState(sortOptions[0].value);
  const contextData = useContext(PageSettings);

  const srcTasks = contextData.srcTasks;
  //const srcTasks2 = contextData.srcTasks;

  const [srcTasks2, dispatch] = useReducer(handleTasks, contextData.srcTasks);

  function handleTasks(tasks, action) {
    switch(action.type) {
      case "complete": {
        return tasks.map(task => {
          if (task.id === +action.taskId) {
            return {
              ...task,
              status: "finished",
            }
          } else {
            return task;
          }
        })
      }

      case "addParticipant": {
        const tasksCopy = JSON.parse(JSON.stringify(tasks));

        tasksCopy.map(task => {
          if (task.id === +action.task.id) {
            const newParticipants = task.participants;
            newParticipants.push(action.task.name);

            return {
              ...task,
              participants: newParticipants
            }
          } else {
            return task;
          }
        })

        if (sortType === "number") {
          tasksCopy.sort((taskA, taskB) => sortByParticipantsNumber(taskA, taskB));
        }

        return tasksCopy;
      }
      
      case "sort": {
        const tasksCopy = JSON.parse(JSON.stringify(tasks));
        setSortType(action.sortType);

        switch(action.sortType) {
          case "start":
          case "finish": {
            return tasksCopy.sort((taskA, taskB) => sortTasksByDate(action.sortType, taskA, taskB));
          }
          case "number": {
            return tasksCopy.sort((taskA, taskB) => sortByParticipantsNumber(taskA, taskB));
          }
          default: return tasksCopy.sort((taskA, taskB) => sortById(taskA, taskB));
        }
      }

      case "addTask": {
        const tasksCopy = JSON.parse(JSON.stringify(tasks));
        tasksCopy.push(action.newTask);
        return tasksCopy;
      }

      default: return tasks;
    }
  }


  //const dispatch = contextData.dispatch;
  const filterText = "";
  const fTask = srcTasks[0];
  console.log(fTask);

  console.log(contextData);

  //const {tasks} = useLoaderData();
  console.log(srcTasks);

  return (
    <PageSettings.Provider value={{srcTasks, srcTasks2, fTask, filterText, dispatch}}>
      <TasksList/>
    </PageSettings.Provider>
  )
}