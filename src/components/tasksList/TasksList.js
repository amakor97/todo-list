import tasksList from "./tasksList.module.css";
import Task from "../task/Task.js";
import SortSelect from "../sortSelect/SortSelect.js";
import Search from "../search/Search.js";

import { useState, useContext } from "react";
import { PageSettings } from "../../pageSettings.js";

const sortOptions = [
  {id: 1, name: "Select sort", value: "none"},
  {id: 2, name: "Start date", value: "start"},
  {id: 3, name: "Finish date", value: "finish"}, 
  {id: 4, name: "P-ants number", value: "number"}
];


export default function TasksList() {
  const [searchText, setSearchText] = useState("");
  const contextData = useContext(PageSettings);

  const error = contextData.error;
  const dispatch = contextData.dispatch;
  const tasks = contextData.tasks;
  const filterText = contextData.filterText;

  if (error) {
    return null;
  }

/*
  function handleTasks(tasks, action) {
    switch(action.type) {
      case "complete": {
        return tasks.map(task => {
          if (task.id === +action.taskId) {
            return {
              ...task,
              status: "finished"
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

        //if (sortType === "number") {
          tasksCopy.sort((taskA, taskB) => sortByParticipantsNumber(taskA, taskB));
        //}

        return tasksCopy;
      }
      
      case "sort": {
        const tasksCopy = JSON.parse(JSON.stringify(tasks));

        //setSortType(action.sortType);

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

      default: return tasks;
    }
  }
*/

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
        tasksArr.map(task => 
          <Task 
            taskData={task} 
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