import taskLink from "./taskLink.module.css";

export default function TaskLink({taskNum, onLinkClick}) {
  return (
    <div className={taskLink.taskLink} onClick={() => onLinkClick(taskNum)}>{taskNum}</div>
  )
}