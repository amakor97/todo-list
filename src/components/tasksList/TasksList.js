import tasksList from "./tasksList.module.css";

import TaskLink from "../taskLink/TaskLink.js";
import Task from "../task/Task.js";
import SortSelect from "../sortSelect/SortSelect.js";
import Search from "../search/Search.js";
import AddTaskForm from "../addTaskForm/AddTaskForm.js";

import { getTasks, getTasksByCategory, getTasksByTimeStatus, getTasksByTitle } from "../../requests/tasksRequests.js";

import { useState, useContext, useRef } from "react";
import { PageSettings } from "../../pageSettings.js";
import { useLoaderData, Form, useSubmit, useLocation } from "react-router-dom";

const sortOptions = [
  {id: 1, name: "Select sort", value: "none"},
  {id: 2, name: "Start date", value: "start"},
  {id: 3, name: "Finish date", value: "finish"}, 
  {id: 4, name: "P-ants number", value: "number"}
];

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


export default function TasksList() {
  const [searchText, setSearchText] = useState("");
  const contextData = useContext(PageSettings);
  console.log(contextData);

  const location = useLocation();

  const dispatch = contextData.dispatch;
  const srcTasks = contextData.srcTasks;
  const srcTasks2 = (contextData.srcTasks2.tasks) ? contextData.srcTasks2.tasks : contextData.srcTasks2;
  console.log("compare");
  console.log(srcTasks);
  console.log(srcTasks2);
  //const {tasks} = useLoaderData();
  const tasks = JSON.parse(JSON.stringify(srcTasks));
  const filterText = contextData.filterText;

  const setSortType = contextData.setSortType;
//
  const taskRefs = useRef([]);



  function handleAddParticipant(newParticipant, taskId) {
    dispatch({
      type:"addParticipant",
      task: {
        name: newParticipant,
        id: taskId,
      }
    })
  }


  function handleSortSelect(sortType) {
    /*dispatch({
      type: "sort",
      sortType
    })*/

      console.log(sortType);
    setSortType(sortType);
  }


  function handleTaskComplete(taskId) {
    dispatch({
      type: "complete",
      taskId
    })
  }


  function handleScroll(taskId) {
    taskRefs.current = taskRefs.current.filter(task => task);
    taskRefs.current.forEach(task => {
      if (task.id.indexOf(taskId.toString()) !== -1) {
        task.scrollIntoView();
      };
    });
  }

 // = tasks;
  let tasksArr = srcTasks2;
  console.log(tasksArr);
  tasksArr = tasksArr.filter(task => 
    task.description.toLowerCase().includes(searchText.toLowerCase()));



  return (
    <div className={tasksList.tasksList}>
      <div className={tasksList.header}>
        <h2 className={tasksList.title}>{filterText}</h2>
        <SortSelect options={sortOptions} onOptionChange={handleSortSelect}/>
        {(location.pathname === "/") && <Search/>}
      </div>
      {
        (tasksArr.length !== 0) ? 
        <div className={tasksList.linksCont}>
          {
            tasksArr.map(task => 
            <TaskLink taskId={task.id} onLinkClick={handleScroll} key={task.id}/>)
          }
        </div> :
        null
      }

      {
        (tasksArr.length !== 0) ? 
        tasksArr.map((task) => 
          <Task 
            ref={el => taskRefs.current.push(el)}
            taskData={task} 
            id={`task-id-${task.id}`}
            key={task.id}
            onAddParticipant={handleAddParticipant}
            onTaskComplete={handleTaskComplete}/>
        ) :
        <h3 className={tasksList.warning}>
          There are no tasks or all tasks are filtered
        </h3>
      }
    </div>
  );
}