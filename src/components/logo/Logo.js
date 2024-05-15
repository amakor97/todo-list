import logoStyles from "./logo.module.css";
import icon from "./icon.png";

export default function Logo() {
  return (
    <div className={logoStyles.wrapper}>
      <img className={logoStyles.icon} src={icon} alt="todo list logo"/>
    </div>
  );
}