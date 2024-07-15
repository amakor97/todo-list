import addTaskForm from "./addTaskForm.module.css";

import { useContext } from "react";
import { Form } from "react-router-dom";

import { PageSettings } from "../../pageSettings.js";


export default function AddTaskForm() {
  const contextData = useContext(PageSettings);
  let task = contextData.task;

  if (!task) {
    task = {
      description: "",
      comments: [],
      participants: [],
    }
  }

  return (
    <Form className={addTaskForm.addTaskForm} method="PUT">
      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="description">
          Task name:
        </label>
        <input className={addTaskForm.inputText} type="text" 
          name="description" id="decription" placeholder="Enter task name"
          defaultValue={task.description} 
          disabled={task.description === "" ? false : true} required/>
      </fieldset>

      <fieldset className={addTaskForm.fieldset}>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="comments1" id="comments-imp" value="important" 
          defaultChecked={task.comments.includes("important") ? true : false}/>
        <label className={addTaskForm.labelCb} htmlFor="comments-imp">
          Important
        </label>
        <input className={addTaskForm.inputCheckbox} type="checkbox" 
          name="comments2" id="comments-lt" value="long-term" 
          defaultChecked={task.comments.includes("long-term") ? true : false}/>
        <label className={addTaskForm.labelCb} htmlFor="comments-lt">
          Long-term
        </label>
      </fieldset>

      <fieldset className={addTaskForm.fieldset}>
        <label htmlFor="participants">Participants:</label>
        <input className={addTaskForm.inputText} type="text" name="participants" 
          id="participants" 
          placeholder="Enter list of participants separated by comma" 
          defaultValue={task.participants.join(", ")}/>
      </fieldset>

      <fieldset className={addTaskForm.fieldset}>
        <label className={addTaskForm.label} htmlFor="start">Start date:</label>
        <input className={addTaskForm.inputDate} type="date" name="start" id="start" 
          defaultValue={task.startDate ? task.startDate.replaceAll(".", "-") : undefined}
          required/>
        <br/>
        <label className={addTaskForm.label} htmlFor="finish">Finish date:</label>
        <input className={addTaskForm.inputDate} type="date" name="finish" id="finish" 
        defaultValue={task.finishDate ? task.finishDate.replaceAll(".", "-") : undefined}
          required/>
      </fieldset>

      <button className={addTaskForm.submitBtn} type="submit" 
        name="intent" value="submit">Submit</button>
      <button className={addTaskForm.submitBtn} type="submit" 
        name="intent" value="delete">Delete</button>
    </Form>
  );
}