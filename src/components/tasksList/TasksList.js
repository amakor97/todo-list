import tasksList from "./tasksList.module.css";
import Task from "../task/Task.js";
import Search from "../search/Search.js";

import { useState } from "react";
import useTasks from "../../hooks/useTasks.js";


function sortTasksByFinishDate(taskA, taskB) {
  let finishA = Date.parse(taskA.finishDate);
  let finishB = Date.parse(taskB.finishDate);
  return finishA - finishB;
}


export default function TasksList() {
  const [searchText, setSearchText] = useState("");
  const {error, filterText, tasks} = useTasks();

  const [tasksData, setTasksData] = useState(tasks);

  console.log(tasksData);

  if (error) {
    return null;
  }

  function handleInputSearch(e) {
    setSearchText(e.target.value);
  }

  function handleAddParticipant(newParticipant, taskId) {

    console.log(newParticipant, taskId);

    const tasksDataCopy = [...tasksData];
    console.log(tasksDataCopy);

    const taskIndex = tasksData.findIndex(task => task.id === taskId);
    console.log(taskIndex);

    //const taskParticipants = tasksData[taskIndex].participants;
    tasksDataCopy[taskIndex].participants.push(newParticipant);
    console.log(tasksDataCopy[taskIndex].participants);
  }

  let tasksArr = tasks.filter(task => task.status !== "finished").sort(
    (taskA, taskB) => sortTasksByFinishDate(taskA, taskB));
  tasksArr = tasksArr.filter(task => 
    task.description.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className={tasksList.tasksList}>
      <div className={tasksList.header}>
        <h2 className={tasksList.title}>{filterText}</h2>
        <Search onInputSearch={handleInputSearch}/>
      </div>
      {
        (tasksArr.length !== 0) ? 
        tasksArr.map(task => 
          <Task 
            taskData={task} 
            key={task.id}
            onAddParticipant={handleAddParticipant}
          />
        ) :
        <h3 className={tasksList.warning}>
          There are no tasks or all tasks are filtered
        </h3>
      }
    </div>
  );
}