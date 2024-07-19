import addTaskForm from "./addTaskForm.module.css";

import { useContext } from "react";
import { Form, useLocation, redirect } from "react-router-dom";

import { PageSettings } from "../../pageSettings.js";

import { useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, deleteTask, tasksId } from "../../pages/tasksSlice.js";


function getMaxId(ids) {
  let maxId = 0;

  Array.from(ids).forEach(id => {
    if (id > maxId) {
      maxId = id;
    }
  })
  
  return maxId;
}


export default function AddTaskForm() {
  const dispatch = useDispatch();
  const loc = useLocation();
  const contextData = useContext(PageSettings);
  let task = contextData.task;

  if (!task) {
    task = {
      description: "",
      comments: [],
      participants: [],
    }
  }

  const [taskTitle, setTaskTitle] = useState(task.description);
  const [comments, setComments] = useState(task.comments);
  const [participantsStr, setParticipantsStr] = useState(task.participants.join(", "));
  const [start, setStart] = useState(task.startDate);
  const [finish, setFinish] = useState(task.finishDate);


  function handleTitleInputChange(e) {
    setTaskTitle(e.target.value);
  }

  function handleParticipantsInputChange(e) {
    setParticipantsStr(e.target.value);
  }

  function handleCommentsInputChange(e) {
    if (!e.target.checked) {
      let commentsCopy = comments.filter(comment => comment !== e.target.value);
      setComments(commentsCopy);
    } else {
      let commentsCopy = [...comments, e.target.value].sort();
      setComments(commentsCopy);
    }
  }

  function handleStartDateInput(e) {
    setStart(e.target.value);
  }

  function handleFinishDateInput(e) {
    setFinish(e.target.value);
  }

  let nextId = getMaxId(useSelector(tasksId)) + 1;

  function prepareData() {
    const participantsArr = participantsStr.split(", ");
    const startDate = start.replaceAll("-", ".");
    const finishDate = finish.replaceAll("-", ".");

    const taskData = {
      description: taskTitle,
      startDate,
      finishDate,
      comments,
      participants : participantsArr,
      status: "not finished",
      id: loc.pathname.includes("update") ? task.id : nextId,
    }

    if (loc.pathname.includes("update")) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(createTask(taskData));
    }
  }


  return (
    <form className={addTaskForm.addTaskForm}>
      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="description">
          Task name:
        </label>
        <input className={addTaskForm.inputText} type="text" 
          name="description" id="decription" placeholder="Enter task name"
          defaultValue={task.description} 
          disabled={task.description === "" ? false : true} required onChange={handleTitleInputChange}/>
      </fieldset>

      <fieldset className={addTaskForm.fieldset}>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="comments1" id="comments-imp" value="important" 
          defaultChecked={task.comments.includes("important") ? true : false} onChange={handleCommentsInputChange}/>
        <label className={addTaskForm.labelCb} htmlFor="comments-imp">
          Important
        </label>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="comments2" id="comments-lt" value="long-term" 
          defaultChecked={task.comments.includes("long-term") ? true : false} onChange={handleCommentsInputChange}/>
        <label className={addTaskForm.labelCb} htmlFor="comments-lt">
          Long-term
        </label>
      </fieldset>

      <fieldset className={addTaskForm.fieldset}>
        <label htmlFor="participants">Participants:</label>
        <input className={addTaskForm.inputText} type="text" name="participants" 
          id="participants" 
          placeholder="Enter list of participants separated by comma" 
          defaultValue={task.participants.join(", ")} onChange={handleParticipantsInputChange}/>
      </fieldset>

      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="start">Start date:</label>
        <input className={addTaskForm.inputDate} type="date" name="start" id="start" 
          defaultValue={task.startDate ? task.startDate.replaceAll(".", "-") : undefined}
          required onChange={handleStartDateInput}/>
        <br/>
        <label className={addTaskForm.label} htmlFor="finish">Finish date:</label>
        <input className={addTaskForm.inputDate} type="date" name="finish" id="finish" 
        defaultValue={task.finishDate ? task.finishDate.replaceAll(".", "-") : undefined}
          required onChange={handleFinishDateInput}/>
      </fieldset>

      <button className={addTaskForm.submitBtn} type="button" 
        name="intent" value="submit" onClick={prepareData}>Submit</button>
      <button className={addTaskForm.submitBtn} type="button" 
        name="intent" value="delete" onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
    </form>
  );
}