import taskLink from "./taskLink.module.css";

export default function TaskLink({taskId, onLinkClick}) {
  return (
    <div className={taskLink.taskLink} 
      onClick={() => onLinkClick(taskId)}>{taskId}</div>
  )
}