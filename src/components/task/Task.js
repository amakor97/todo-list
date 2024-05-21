import task from "./task.module.css";

export default function Task({taskData}) {
  const commentsStr = taskData.comments.join(", ");
  const participantsStr = taskData.participants.join(", ");

  return (
    <div className={task.task}>
      <div className={task.header}>
        <h2 className={task.title}>{taskData.description}</h2>
        <p>before: {taskData.finishDate}</p>
      </div>
      <div className={task.content}>
        <p className={task.comments}>{commentsStr}</p>
        <p>participants: {participantsStr}</p>
      </div>
      <div className={task.footer}>
        <p>started: {taskData.startDate}</p>
        <button className={task.completeBtn}>Complete</button>
      </div>
    </div>
  )
}