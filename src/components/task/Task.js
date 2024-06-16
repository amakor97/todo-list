import task from "./task.module.css";

import { useState } from "react";

import AddParticipantsForm from "../addParticipantsForm/AddParticipantsForm.js";

export default function Task({taskData, onAddParticipant}) {
  const commentsStr = taskData.comments.join(", ");
  const participantsStr = taskData.participants.join(", ");

  const [isCardOpened, setIsCardOpened] = useState(false);
  const [isAddFormShowed, setAddFormShowed] = useState(false);

  function handleClickEvent() {
    setIsCardOpened(!isCardOpened);
  }

  function handleAddParticipantsEvent() {
    setAddFormShowed(!isAddFormShowed);
  }

  function handleAddParticipantEvent(newParticipant) {
    setAddFormShowed(false);
    onAddParticipant(newParticipant, taskData.id);
  }

  return (
    <div className={task.task}>
      <div className={task.header} onClick={handleClickEvent}>
        <h2 className={task.title}>{taskData.description}</h2>
        <p>before: {taskData.finishDate}</p>
      </div>
      {isCardOpened &&
        <>
          <div className={task.content}>
            <p className={task.comments}>{commentsStr}</p>
            <div className={task.participantsCont}>
              <p>participants: {participantsStr} &nbsp;</p>
              {
                isAddFormShowed ? 
                  <AddParticipantsForm onAddParticipant={handleAddParticipantEvent}/> : 
                  <button 
                    className={task.addParticipantsBtn} 
                    onClick={handleAddParticipantsEvent}>
                    +
                  </button>
              }
              </div>
          </div>
          <div className={task.footer}>
            <p>started: {taskData.startDate}</p>
            <button 
              className={task.completeBtn} 
              onClick={(e) => e.stopPropagation()}>
              Complete
            </button>
          </div>
        </>
      }
    </div>
  )
}