import { useLoaderData, redirect, useLocation } from "react-router-dom";

import AddTaskForm from "../components/addTaskForm/AddTaskForm";

import { getTaskById, updateTask } from "../requests/tasksRequests";

import { PageSettings } from "../pageSettings";


import { useSelector } from "react-redux";
import { taskById } from "./tasksSlice.js";


export async function taskByIdLoader({params}) {
  const task = await getTaskById(params.taskId);
  return {task};
}


export async function updateAction({request, params}) {
  const data = Object.fromEntries(await request.formData());

  data.id = +params.taskId;

  data.comments = [data.comments1, data.comments2].filter(value => value);
  delete data.comments1;
  delete data.comments2;
  
  data.startDate = data.start.replaceAll("-", ".");
  data.finishDate = data.finish.replaceAll("-", ".");
  delete data.start;
  delete data.finish;

  const defData = await getTaskById(data.id);
  data.description = defData.description;
  data.status = defData.status;

  data.participants = data.participants.split(", ");
  await updateTask(data, params.taskId);
  return redirect("/");
}


export default function AddTaskPage() {
  let loc = useLocation();
  let id = loc.pathname.slice(1, loc.pathname.lastIndexOf("/"));

  //const {task} = useLoaderData();
  const task = useSelector(state => taskById(state, +id));

  return (
    <PageSettings.Provider value={{task}}>
      <AddTaskForm/>
    </PageSettings.Provider>
  );
}