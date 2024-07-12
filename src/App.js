import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";

import app from "./app.module.css";

import { getImportantOpenedTasksFromLs, getTasks, getTasksFromLs } from "./requests/tasksRequests.js";

import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";
import useTasks from "./hooks/useTasks.js";
import { PageSettings } from "./pageSettings.js";
import SmallTask from "./components/smallTask/SmallTask.js";


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

export async function tasksLoaderImp() {
  let tasks2 = await getTasks();
  let openTasksLen = tasks2.filter(task => task.status === "not finished").length;
  tasks2 = tasks2.filter(task => task.comments.includes("important") && task.status === "not finished").splice(0, 2);
  return {tasks2, openTasksLen};
}

export async function tasksLoaderFromLs() {
  let tasks2 = await getTasksFromLs();
  let openTasksLen = tasks2.filter(task => task.status === "not finished").length;
  return {tasks2, openTasksLen};
}


export async function tasksLoaderComplexFromLs() {
  let tasks2 = await getTasksFromLs();
  let openedImpTasks = await getImportantOpenedTasksFromLs();
  let openTasksLen = tasks2.filter(task => task.status === "not finished").length;
  console.log(tasks2);
  console.log(openedImpTasks);
  return {tasks2, openTasksLen};
}


function App() {
  const {error, filterText, tasksData} = useTasks();
  const [sortType, setSortType] = useState(sortOptions[0].value);
  const [srcTasks, dispatch] = useReducer(handleTasks, JSON.parse(window.localStorage.getItem("tasks")));


  console.log(srcTasks);

  //window.localStorage.setItem("tasks", JSON.stringify(tasksData));

  const {tasks2, openTasksLen} = useLoaderData();

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

  function handleUnload() {
    console.log(srcTasks);
    //window.localStorage.setItem("tasks", JSON.stringify(srcTasks));
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
  }, []);



  return (
    <div>
      <Header/>
      <aside className={app.cont}>
        <div>
          <p>Number of tasks: {openTasksLen}</p>
        </div>
        {
          tasks2.map(task => <SmallTask key={task.id} task={task}/>)
        }
        <div>
          <NavLink
            to="/">
              All
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/opened">
              Open
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/opened/running">
              Open-running
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/opened/expired">
              Open-expired
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/closed">
              Closed
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/add">
              Add
          </NavLink>
        </div>
      </aside>
      <PageSettings.Provider value={{srcTasks, filterText, dispatch}}>
        {
          error ? null : <Outlet/>
        }
      </PageSettings.Provider>
      <Footer/>
    </div>
  );
}

export default App;


/*

[
  {
    id: 1, 
    startDate: "2024.05.13", 
    finishDate: "2024.08.05", 
    comments: ["important"], 
    description: "study js react course", 
    participants: ["myself"],
    status: "not finished"
  }
]

*/