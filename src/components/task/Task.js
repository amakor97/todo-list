import task from "./task.module.css";

import { useState, forwardRef } from "react";

import AddParticipantsForm from "../addParticipantsForm/AddParticipantsForm.js";
import { NavLink } from "react-router-dom";

export default forwardRef(
    function Task({taskData, onAddParticipant, onTaskComplete, id}, ref) {
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
      <div className={task.task} ref={ref} id={id}>
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
              <NavLink className={task.completeBtn} to={"/" + taskData.id + "/update"}>Update</NavLink>
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
);