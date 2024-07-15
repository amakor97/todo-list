import search from "./search.module.css";

import { Form, useSubmit } from "react-router-dom";

export default function Search() {
  const submit = useSubmit();

  return (
    <Form>
      <input 
        type="search" name="task_filter"
        className={search.search} 
        onChange={(event) => {submit(event.currentTarget.form)}}
        placeholder="Search task..."
      />
    </Form>
  );
}