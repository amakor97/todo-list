import tasksList from "./tasksList.module.css";
import Task from "../task/Task.js";
import SortSelect from "../sortSelect/SortSelect.js";
import Search from "../search/Search.js";

import { useState } from "react";
import useTasks from "../../hooks/useTasks.js";


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


export default function TasksList() {
  const [searchText, setSearchText] = useState("");
  const {error, filterText, tasks} = useTasks();
  const [tasksData, setTasksData] = useState(tasks);
  const [sortType, setSortType] = useState("none");

  if (error) {
    return null;
  }

  function handleInputSearch(e) {
    setSearchText(e.target.value);
  }

  function handleAddParticipant(newParticipant, taskId) {
    const tasksDataCopy = JSON.parse(JSON.stringify(tasksData));
    const taskIndex = tasksDataCopy.findIndex(task => task.id === taskId);
    tasksDataCopy[taskIndex].participants.push(newParticipant);


    if (sortType === "number") {
      tasksDataCopy.sort((taskA, taskB) => (sortByParticipantsNumber(taskA, taskB)));
      setTasksData(tasksDataCopy);
    } else {
      setTasksData(tasksDataCopy);
    }


  }

  function handleSortSelect(type) {
    const sortSelected = type;
    const tasksDataCopy = JSON.parse(JSON.stringify(tasksData));

    switch(sortSelected) {
      case "start": {
        tasksDataCopy.sort((taskA, taskB) => sortTasksByDate("start", taskA, taskB));
        setTasksData(tasksDataCopy);
        break;
      }
      case "finish": {
        tasksDataCopy.sort((taskA, taskB) => sortTasksByDate("finish", taskA, taskB));
        setTasksData(tasksDataCopy);
        break;
      }
      case "number": {
        tasksDataCopy.sort((taskA, taskB) => (sortByParticipantsNumber(taskA, taskB)));
        setTasksData(tasksDataCopy);
        break;
      }
      default: {
        setTasksData(tasks);
        break;
      }
    }

    setSortType(sortSelected);
  }

  let tasksArr = tasksData.filter(task => task.status !== "finished");
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
          />
        ) :
        <h3 className={tasksList.warning}>
          There are no tasks or all tasks are filtered
        </h3>
      }
    </div>
  );
}