import sortSelectStyles from "./sortSelect.module.css";

export default function SortSelect({options, onOptionChange}) {
  return (
    <select 
      className={sortSelectStyles.select} 
      onChange={(e) => onOptionChange(e.target.value)}>
        {options.map(opt => 
          <option 
            className={sortSelectStyles.opt} 
            key={opt.id} 
            value={opt.value}>
              {opt.name}
          </option>
      )}
    </select>
  )
}