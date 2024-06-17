import task from "./task.module.css";

import { useState } from "react";

import AddParticipantsForm from "../addParticipantsForm/AddParticipantsForm.js";

export default function Task({taskData, onAddParticipant, onTaskComplete}) {
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [isAddFormShowed, setAddFormShowed] = useState(false);

  const commentsStr = taskData.comments.join(", ");
  const participantsStr = taskData.participants.join(", ");

  
  function handleClickEvent() {
    setIsCardOpened(!isCardOpened);
  }


  function handleAddParticipantsEvent() {
    setAddFormShowed(true);
  }


  function handleAddParticipantEvent(newParticipant) {
    setAddFormShowed(false);
    onAddParticipant(newParticipant, taskData.id);
  }


  function handleCloseAddParticipantForm() {
    setAddFormShowed(false);
  }


  function handleCompleteBtnClick(e) {
    e.stopPropagation();
    onTaskComplete(taskData.id);
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
                  <AddParticipantsForm 
                    onAddParticipant={handleAddParticipantEvent} 
                    onCloseForm={handleCloseAddParticipantForm}/> : 
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
              onClick={handleCompleteBtnClick}>
                Complete
            </button>
          </div>
        </>
      }
    </div>
  )
}