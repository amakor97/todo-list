import sTask from "./task.module.css";

export default function SmallTask({task}) {
  return (
    <div className={sTask.task}>
      <p>{task.description}</p>
      <p>Before: {task.finishDate}</p>
    </div>
  );
}