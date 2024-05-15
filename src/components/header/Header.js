import Logo from "../logo/Logo.js";
import Menu from "../menu/Menu.js";

import headerStyles from "./header.module.css";

export default function Header() {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <Logo/>
      </div>
      <p className={headerStyles.title}>Todo list</p>
      <div className={headerStyles.menu}>
        <Menu/>
      </div>
    </header>
  );
}