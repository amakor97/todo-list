import { useLoaderData, useNavigate } from "react-router-dom";
import AddTaskForm from "../components/addTaskForm/AddTaskForm";
import { getTaskById, updateTask } from "../requests/tasksRequests";
import { useContext } from "react";
import { PageSettings } from "../pageSettings";
import { redirect } from "react-router-dom";

export async function taskByIdLoader({params}) {
  console.log(params);
  const task = await getTaskById(params.taskId);
  console.log(task);
  return {task};
}


export async function updateAction({request, params}) {
  const data = Object.fromEntries(await request.formData());

  console.log("upd:");
  console.log(data);

  data.id = +params.taskId;

  data.comments = [data.comments1, data.comments2].filter(value => value);
  delete data.comments1;
  delete data.comments2;
  
  data.startDate = data.start.replaceAll("-", ".");
  data.finishDate = data.finish.replaceAll("-", ".");

  delete data.start;
  delete data.finish;

  const defData = await getTaskById(data.id);
  console.log(defData);
  data.description = defData.description;
  data.status = defData.status;

  data.participants = data.participants.split(", ");

  console.log(data);

  const task = await updateTask(data, params.taskId);
  console.log(task);




  //window.history.pushState({}, undefined, "/update");

  return redirect("/");
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