import tasksList from "./tasksList.module.css";

import TaskLink from "../taskLink/TaskLink.js";
import Task from "../task/Task.js";
import SortSelect from "../sortSelect/SortSelect.js";
import Search from "../search/Search.js";

import { completeTask, getTasks, getTasksByCategory, getTasksByTimeStatus, getTasksByTitle } from "../../requests/tasksRequests.js";

import { useContext, useRef } from "react";
import { PageSettings } from "../../pageSettings.js";
import { useLocation, redirect } from "react-router-dom";


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
  const tasks = await getTasksByCategory(url.pathname);
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


export async function completeTaskByIdAction({request}) {
  const data = Object.fromEntries(await request.formData());
  await completeTask(data.complete);
  return redirect("/");
}


export default function TasksList() {
  const contextData = useContext(PageSettings);
  const location = useLocation();
  const srcTasks2 = (contextData.srcTasks2.tasks) ? contextData.srcTasks2.tasks : contextData.srcTasks2;
  const filterText = contextData.filterText;
  const setSortType = contextData.setSortType;
  const taskRefs = useRef([]);


  function handleSortSelect(sortType) {
    setSortType(sortType);
  }


  function handleScroll(taskId) {
    taskRefs.current = taskRefs.current.filter(task => task);
    taskRefs.current.forEach(task => {
      if (task.id.indexOf(taskId.toString()) !== -1) {
        task.scrollIntoView();
      };
    });
  }

  let tasksArr = srcTasks2;


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
            key={task.id}/>
        ) :
        <h3 className={tasksList.warning}>
          There are no tasks or all tasks are filtered
        </h3>
      }
    </div>
  );
}