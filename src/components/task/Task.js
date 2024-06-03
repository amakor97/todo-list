import task from "./task.module.css";

import { useState } from "react";


export default function Task({taskData}) {
  const commentsStr = taskData.comments.join(", ");
  const participantsStr = taskData.participants.join(", ");

  const [isCardOpened, setIsCardOpened] = useState(false);


  function handleClickEvent() {
    setIsCardOpened(!isCardOpened);
  }

  
  return (
    <div className={task.task} onClick={handleClickEvent}>
      <div className={task.header}>
        <h2 className={task.title}>{taskData.description}</h2>
        <p>before: {taskData.finishDate}</p>
      </div>
      {isCardOpened &&
        <>
          <div className={task.content}>
            <p className={task.comments}>{commentsStr}</p>
            <p>participants: {participantsStr}</p>
          </div>
          <div className={task.footer}>
            <p>started: {taskData.startDate}</p>
            <button className={task.completeBtn} onClick={(e) => e.stopPropagation()}>Complete</button>
          </div>
        </>
      }
    </div>
  )
}