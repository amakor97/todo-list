import sortSelectStyles from "./sortSelect.module.css";

export default function SortSelect({options, onOptionChange}) {
  function handleOptionChange(e) {
    onOptionChange(e.target.value);
  }

  console.log(options);

  return (
    <select className={sortSelectStyles.select} onChange={(e) => handleOptionChange(e)}>
      {options.map(opt => <option className={sortSelectStyles.opt} key={opt.id} value={opt.value}>{opt.name}</option>)}
    </select>
  )
}