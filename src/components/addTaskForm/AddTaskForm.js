import addTaskForm from "./addTaskForm.module.css";

import { useReducer } from "react";
import { useContext } from "react";
import { PageSettings } from "../../pageSettings.js";

import { Form } from "react-router-dom";

export default function AddTaskForm({onAddTask, onCancelAddingTask}) {
  const [tmpTask, dispatch] = useReducer(handleTmpTask, {
    description: "",
    comments: [],
    participants: [],
    startDate: undefined,
    finishDate: undefined
  });

  function handleTmpTask(tmpTask, action) {
    switch(action.type) {
      case "editParticipants": {
        return ({
          ...tmpTask,
          participants: action.value
        });
      }

      case "editDesc": {
        return ({
          ...tmpTask,
          description: action.value
        });
      }

      case "editFlags": {
        return ({
          ...tmpTask,
          comments: action.values
        });
      }

      case "editDate": {
        if (action.dateObj.inputType === "start") {
          return ({
            ...tmpTask,
            startDate: action.dateObj.date
          });
        }
        if (action.dateObj.inputType === "finish") {
          return ({
            ...tmpTask,
            finishDate: action.dateObj.date
          });
        }
        break;
      }

      default: break;
    }

  }

  function handleTextInputChange(e) {
    let value = "";
    switch(e.target.name) {
      case "participants": {
        value = e.target.value.split(",");
        value.filter(elem => (elem !== "") || (elem !== " "));
        dispatch({
          type: "editParticipants",
          value
        })
        break;
      }

      case "title": {
        value = e.target.value;
        dispatch({
          type: "editDesc",
          value
        });
        break;
      }

      default: break;
    }
  }

  function handleCheckboxInputChange(e) {
    const checkedInputs = document.querySelectorAll("input[type=checkbox]:checked");
    const values = [];
    checkedInputs.forEach(input => values.push(input.value));
    dispatch({
      type: "editFlags",
      values
    });
  }

  function handleDateInputChange(e) {
    let inputType = e.target.name;
    let date = e.target.value.replaceAll("-", ".");
    dispatch({
      type: "editDate",
      dateObj: {
        inputType,
        date
      }
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onAddTask(tmpTask);
  }

  function handleFormReset(e) {
    e.preventDefault();
    onCancelAddingTask();
  }

  const contextData = useContext(PageSettings);
  let task = contextData.task;

  console.log(task);

  if (!task) {
    task = {
      id: undefined,
      description: "",
      comments: [],
      participants: [],
    }
  }

  return (
    <Form className={addTaskForm.addTaskForm} method="PUT">
      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="description">Task name:</label>
        <input className={addTaskForm.inputText} type="text" 
          name="description" id="decription" placeholder="Enter task name"
          defaultValue={task.description} disabled={task.description === "" ? false : true} required/>

      </fieldset>
      <fieldset className={addTaskForm.fieldset}>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="comments1" id="comments-imp" value="important" defaultChecked={task.comments.includes("important") ? true : false}
          />
        <label className={addTaskForm.labelCb} htmlFor="comments-imp">Important</label>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="comments2" id="comments-lt" value="long-term" defaultChecked={task.comments.includes("long-term") ? true : false} 
          />
        <label className={addTaskForm.labelCb} htmlFor="comments-lt">Long-term</label>
      </fieldset>
      <fieldset className={addTaskForm.fieldset}>
        <label htmlFor="participants">Participants:</label>
        <input className={addTaskForm.inputText} type="text" name="participants" 
          id="participants" placeholder="Enter list of participants separated by comma" defaultValue={task.participants.join(", ")}
          />
      </fieldset>
      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="start">Start date:</label>
        <input className={addTaskForm.inputDate} type="date" name="start" id="start" defaultValue={task.startDate ? task.startDate.replaceAll(".", "-") : undefined}
          required/>
        <br/>
        <label className={addTaskForm.label} htmlFor="finish">Finish date:</label>
        <input className={addTaskForm.inputDate} type="date" name="finish" id="finish" defaultValue={task.finishDate ? task.finishDate.replaceAll(".", "-") : undefined}
          required/>
      </fieldset>
      <button className={addTaskForm.submitBtn} type="submit" name="intent" value="submit">Submit</button>
      <button className={addTaskForm.submitBtn} type="reset">Reset</button>
      <button className={addTaskForm.submitBtn} type="submit" name="intent" value="delete">Delete</button>
    </Form>
  );
}