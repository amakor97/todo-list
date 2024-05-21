import tasks from "../../tasks.js";

import tasksList from "./tasksList.module.css";
import Task from "../task/Task.js";


function sortTasksByFinishDate(taskA, taskB) {
  let finishA = Date.parse(taskA.finishDate);
  let finishB = Date.parse(taskB.finishDate);
  return finishA - finishB;
}

export default function TasksList() {
  const tasksArr = tasks.filter(task => task.status !== "finished").sort(
    (taskA, taskB) => sortTasksByFinishDate(taskA, taskB)).map(
    task => <Task taskData={task}/>);

  return (
    <div className={tasksList.tasksList}>
      {tasksArr}
    </div>
  );
}