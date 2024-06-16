import addFormStyles from "./addParticipantsForm.module.css";

import { useState } from "react";

export default function AddParticipantsForm({onAddParticipant}) {
  const [newParticipant, setNewParticipant] = useState("");
  const [errors, setErrors] = useState(null);
  const [disable, setDisabled] = useState(true);


  function handleChangeTextInput(e) {
    const {value} = e.target;

    setNewParticipant(value);

    if (value.length < 5 || value.length > 30) {
      setErrors("Mismatched length");
      setDisabled(true);
    } else {
      setErrors(null);
      setDisabled(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddParticipant(newParticipant);
  }


  return (
    <form className={addFormStyles.addForm} onSubmit={handleSubmit}>
      <fieldset className={addFormStyles.fieldset}>
        <input
          className={addFormStyles.textInput}
          type="text"
          name="newParticipant"
          onChange={handleChangeTextInput}
        />
        <button className={addFormStyles.addBtn} type="submit" disabled={disable}>Add</button>
        &nbsp;
        <span>{errors}</span>
      </fieldset>
    </form>
  )
}