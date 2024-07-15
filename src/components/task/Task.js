import task from "./task.module.css";

import { useState, forwardRef } from "react";
import { Form, useSubmit, NavLink } from "react-router-dom";

export default forwardRef(
  function Task({taskData, id}, ref) {
    const [isCardOpened, setIsCardOpened] = useState(false);
    let submit = useSubmit();

    const commentsStr = taskData.comments.join(", ");
    const participantsStr = taskData.participants.join(", ");


    function handleClickEvent() {
      setIsCardOpened(!isCardOpened);
    }


    function handleCompleteTask(e) {
      setIsCardOpened(false);
      submit(e.currentTarget);
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
                </div>
            </div>
            <div className={task.footer}>
              <p>started: {taskData.startDate}</p>
              <NavLink className={task.completeBtn} to={"/" + taskData.id + "/update"}>
                Update
              </NavLink>
              <Form method="PUT">
                <button className={task.completeBtn} 
                  type="submit" value={taskData.id} onClick={handleCompleteTask}>
                    Complete
                </button>
              </Form>
            </div>
          </>
        }
      </div>
    )
  }
);