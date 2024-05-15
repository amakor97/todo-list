import menuStyles from "./menu.module.css";

export default function Menu() {
  return (
    <nav className={menuStyles.menu}>
      <ul className={menuStyles.list}>
        <li className={menuStyles.item}>Option #1</li>
        <li className={menuStyles.item}>Option #2</li>
        <li className={menuStyles.item}>Option #3</li>
      </ul>
    </nav>
  );
}