import AddTaskForm from "../components/addTaskForm/AddTaskForm";
import { getTasksId, publishTask } from "../requests/tasksRequests";
import { redirect } from "react-router-dom";


function getMaxId(ids) {
  let maxId = 0;
  Array.from(ids).forEach(id => {
    console.log(id);
    if (id > maxId) {
      maxId = id;
    }
  })
  console.log(maxId);
  return maxId;
}

export async function idsLoader() {
  let ids = await getTasksId();

  return {ids};
}


export async function createAction({request}){
  const data = Object.fromEntries(await request.formData());
  console.log(data);

  console.log(data.comments);
  data.comments = [data.comments1, data.comments2].filter(value => value);
  delete data.comments1;
  delete data.comments2;

  data.startDate = data.start.replaceAll("-", ".");
  data.finishDate = data.finish.replaceAll("-", ".");

  delete data.start;
  delete data.finish;

  data.participants = data.participants.split(", ");
  data.status = "not finished";

  const {ids} = await idsLoader();
  console.log(ids);
  data.id = getMaxId(ids) + 1;

  await publishTask(data);
  return redirect("/");
}

export default function AddTaskPage() {

  return (
    <>
      <AddTaskForm/>
    </>
  );
}