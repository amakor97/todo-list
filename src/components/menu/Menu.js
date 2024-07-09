import menuStyles from "./menu.module.css";

import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className={menuStyles.menu}>
      <ul className={menuStyles.list}>
        <Link className={menuStyles.item} to="/">Tasks List</Link>
        <Link className={menuStyles.item} to="/add">Add task</Link>
      </ul>
    </nav>
  );
}