import sMenu from "./sMenu.module.css";

import SmallTask from "../smallTask/SmallTask.js";
import { NavLink, Outlet } from "react-router-dom";

export default function SideMenu() {
  const tasksNum = 5;

  return (
    <aside className={sMenu.cont}>
      <div>
        <p>Number of tasks: {tasksNum}</p>
      </div>
      <SmallTask/>
      <SmallTask/>
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