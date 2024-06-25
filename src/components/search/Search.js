import search from "./search.module.css";


export default function Search({onInputSearch}) {
  return (
    <input 
      className={search.search} 
      onChange={(e) => onInputSearch(e)} 
      placeholder="Search task..."
    />
  );
}