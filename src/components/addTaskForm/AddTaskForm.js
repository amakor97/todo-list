import addTaskForm from "./addTaskForm.module.css";

import { useReducer } from "react";

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

  return (
    <form className={addTaskForm.addTaskForm} 
      onSubmit={handleFormSubmit} onReset={handleFormReset}>
      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="title">Task name:</label>
        <input className={addTaskForm.inputText} type="text" 
          name="title" id="title" placeholder="Enter task name" 
          onChange={handleTextInputChange} required/>
      </fieldset>
      <fieldset className={addTaskForm.fieldset}>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="flags" id="flags-imp" value="important" 
          onChange={handleCheckboxInputChange}/>
        <label className={addTaskForm.labelCb} htmlFor="flags-imp">Important</label>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="flags" id="flags-lt" value="long-term" 
          onChange={handleCheckboxInputChange}/>
        <label className={addTaskForm.labelCb} htmlFor="flags-lt">Long-term</label>
      </fieldset>
      <fieldset className={addTaskForm.fieldset}>
        <label htmlFor="participants">Participants:</label>
        <input className={addTaskForm.inputText} type="text" name="participants" 
          id="participants" placeholder="Enter list of participants separated by comma" 
          onChange={handleTextInputChange}/>
      </fieldset>
      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="start">Start date:</label>
        <input className={addTaskForm.inputDate} type="date" name="start" id="start" 
          onChange={handleDateInputChange} required/>
        <br/>
        <label className={addTaskForm.label} htmlFor="finish">Finish date:</label>
        <input className={addTaskForm.inputDate} type="date" name="finish" id="finish" 
          onChange={handleDateInputChange} required/>
      </fieldset>
      <button className={addTaskForm.submitBtn} type="submit">Submit</button>
      <button className={addTaskForm.submitBtn} type="reset">Reset</button>
    </form>
  );
}