import sMenu from "./sMenu.module.css";

import SmallTask from "../smallTask/SmallTask.js";
import { NavLink, Outlet } from "react-router-dom";

export default function SideMenu({openedNum, tasksArr}) {
  return (
    <aside className={sMenu.cont}>
      <div>
        <p>Number of tasks: {openedNum}</p>
      </div>
      {
        tasksArr.slice(0, 2).map(task => <SmallTask key={task.id} task={task}/>)
      }
      <div>
        <NavLink
          to="/">
            All
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/opened">
            Open
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/opened/running">
            Open-running
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/opened/expired">
            Open-expired
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/closed">
            Closed
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/add">
            Add
        </NavLink>
      </div>
    </aside>
  );
}