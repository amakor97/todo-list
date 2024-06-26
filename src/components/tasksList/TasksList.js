import tasksList from "./tasksList.module.css";

import TaskLink from "../taskLink/TaskLink.js";
import Task from "../task/Task.js";
import SortSelect from "../sortSelect/SortSelect.js";
import Search from "../search/Search.js";
import AddTaskForm from "../addTaskForm/AddTaskForm.js";

import { useState, useContext, useRef } from "react";
import { PageSettings } from "../../pageSettings.js";

const sortOptions = [
  {id: 1, name: "Select sort", value: "none"},
  {id: 2, name: "Start date", value: "start"},
  {id: 3, name: "Finish date", value: "finish"}, 
  {id: 4, name: "P-ants number", value: "number"}
];


export default function TasksList() {
  const [searchText, setSearchText] = useState("");
  const [isAddTaskFormShowed, setAddTaskFormShowed] = useState(false);
  const contextData = useContext(PageSettings);

  const error = contextData.error;
  const dispatch = contextData.dispatch;
  const tasks = contextData.tasks;
  const filterText = contextData.filterText;

  const taskRefs = useRef([]);


  if (error) {
    return null;
  }


  function getMaxTaskId(tasks) {
    let maxId = 0;
    tasks.forEach(task => {
      if (task.id > maxId) {
        maxId = task.id;
      }
    })
    return maxId;
  }

  function handleInputSearch(e) {
    setSearchText(e.target.value);
  }


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
    dispatch({
      type: "sort",
      sortType
    })
  }


  function handleTaskComplete(taskId) {
    dispatch({
      type: "complete",
      taskId
    })
  }

  function handleClickAddFormBtn() {
    setAddTaskFormShowed(true);
  }
  
  function handleAddTask(newTask) {
    let newId = getMaxTaskId(tasks) + 1;
    newTask.status = "not finished";
    newTask.id = newId;

    setAddTaskFormShowed(false);
    dispatch({
      type: "addTask",
      newTask
    });
  }

  function handleCancelAddingTask() {
    setAddTaskFormShowed(false);
  }


  function handleScroll(taskId) {
    taskRefs.current = taskRefs.current.filter(task => task);
    taskRefs.current.forEach(task => {
      if (task.id.indexOf(taskId.toString()) !== -1) {
        task.scrollIntoView();
      };
    });
  }


  let tasksArr = tasks.filter(task => task.status !== "finished");
  tasksArr = tasksArr.filter(task => 
    task.description.toLowerCase().includes(searchText.toLowerCase()));



  return (
    <div className={tasksList.tasksList}>
      <div className={tasksList.header}>
        <h2 className={tasksList.title}>{filterText}</h2>
        <SortSelect options={sortOptions} onOptionChange={handleSortSelect}/>
        <Search onInputSearch={handleInputSearch}/>
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
      {
        isAddTaskFormShowed ? 
        <AddTaskForm 
          onAddTask={handleAddTask} 
          onCancelAddingTask={handleCancelAddingTask}/> : 
        <button 
          className={tasksList.addTaskFormBtn} 
          onClick={handleClickAddFormBtn}>
            Add task
        </button>
      }
    </div>
  );
}