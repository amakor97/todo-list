import { useLoaderData } from "react-router-dom";
import AddTaskForm from "../components/addTaskForm/AddTaskForm";
import { getTaskById } from "../requests/tasksRequests";
import { useContext } from "react";
import { PageSettings } from "../pageSettings";

export async function taskByIdLoader({params}) {
  console.log(params);
  const task = await getTaskById(params.taskId);
  console.log(task);
  return {task};
}

export default function AddTaskPage() {
  const {task} = useLoaderData();
  console.log(task);

  return (
    <PageSettings.Provider value={{task}}>
      <AddTaskForm/>
    </PageSettings.Provider>
  );
}