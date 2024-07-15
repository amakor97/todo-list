import { Outlet, useLoaderData } from "react-router-dom";
import { getTasksFromLs } from "./requests/tasksRequests.js";

import { PageSettings } from "./pageSettings.js";

import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import SideMenu from "./components/sideMenu/SideMenu.js";


export async function tasksLoaderComplexFromLs() {
  let srcTasks = await getTasksFromLs();
  let openTasksLen = srcTasks.filter(task => task.status === "not finished").length;
  return {srcTasks, openTasksLen};
}


function App() {
  const {srcTasks, openTasksLen} = useLoaderData();
  const tasksArr = srcTasks.filter(
    task => task.status === "not finished").slice(0, 2);

  return (
    <div>
      <Header/>
      <SideMenu tasksArr={tasksArr} openedNum={openTasksLen}/>
      <PageSettings.Provider value={{srcTasks}}>
        <Outlet/>
      </PageSettings.Provider>
      <Footer/>
    </div>
  );
}

export default App;






/*

[{"id":1,"startDate":"2024.05.13","finishDate":"2024.08.05","comments":["important"],"description":"study js react course","participants":["myself"],"status":"not finished"},{"id":2,"startDate":"2024.04.27","finishDate":"2024.05.13","comments":["not important"],"description":"enjoy vacation","participants":["myself"],"status":"finished"},{"id":3,"startDate":"2024.05.20","finishDate":"2024.05.24","comments":["important"],"description":"do some work tasks","participants":["myself","my colleguaes"],"status":"finished"},{"id":4,"startDate":"2024.05.20","finishDate":"2024.05.20","comments":["important"],"description":"go to see a doctor","participants":["myself"],"status":"not finished"},{"id":5,"startDate":"2024.01.01","finishDate":"2024.12.31","comments":["important"],"description":"improve web dev skills","participants":["myself"],"status":"not finished"},{"participants":["myself"],"id":6,"comments":["long-term"],"startDate":"2024.03.08","finishDate":"2024.09.01","description":"read 'Sapiens' book","status":"not finished"}]

*/