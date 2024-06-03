import tasksList from "./tasksList.module.css";
import Task from "../task/Task.js";
import useTasks from "../../hooks/useTasks.js";


function sortTasksByFinishDate(taskA, taskB) {
  let finishA = Date.parse(taskA.finishDate);
  let finishB = Date.parse(taskB.finishDate);
  return finishA - finishB;
}

export default function TasksList() {
  const {error, filterText, tasks} = useTasks();
  if (error) {
    return null;
  }

  const tasksArr = tasks.filter(task => task.status !== "finished").sort(
    (taskA, taskB) => sortTasksByFinishDate(taskA, taskB));

  return (
    <div className={tasksList.tasksList}>
      <h2 className={tasksList.title}>{filterText}</h2>
      {tasksArr.map(task => <Task taskData={task}/>)}
    </div>
  );
}