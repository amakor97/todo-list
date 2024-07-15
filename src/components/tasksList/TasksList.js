import tasksList from "./tasksList.module.css";

import TaskLink from "../taskLink/TaskLink.js";
import Task from "../task/Task.js";
import SortSelect from "../sortSelect/SortSelect.js";
import Search from "../search/Search.js";

import { useContext, useRef } from "react";
import { useLocation, redirect } from "react-router-dom";
import { PageSettings } from "../../pageSettings.js";

import { completeTask } from "../../requests/tasksRequests.js";

const sortOptions = [
  {id: 1, name: "Select sort", value: "none"},
  {id: 2, name: "Start date", value: "start"},
  {id: 3, name: "Finish date", value: "finish"}, 
  {id: 4, name: "P-ants number", value: "number"}
];


export async function completeTaskByIdAction({request}) {
  console.log("complete");
  console.log(request);
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  await completeTask(data.complete);
  return redirect("/");
}


export default function TasksList() {
  const contextData = useContext(PageSettings);
  const location = useLocation();
  const srcTasks2 = (contextData.srcTasks2.tasks) ? 
    contextData.srcTasks2.tasks : contextData.srcTasks2;
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


  return (
    <div className={tasksList.tasksList}>
      <div className={tasksList.header}>
        <h2 className={tasksList.title}>Tasks:</h2>
        <SortSelect options={sortOptions} onOptionChange={handleSortSelect}/>
        {(location.pathname === "/") && <Search/>}
      </div>
      {
        (srcTasks2.length !== 0) ? 
        <div className={tasksList.linksCont}>
          {
            srcTasks2.map(task => 
              <TaskLink taskId={task.id} onLinkClick={handleScroll} key={task.id}/>)
          }
        </div> :
        null
      }
      {
        (srcTasks2.length !== 0) ? 
        srcTasks2.map((task) => 
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