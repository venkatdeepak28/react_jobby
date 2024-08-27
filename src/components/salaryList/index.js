const SalaryList = props => {
  const {eachValue, changeSalary} = props

  const salaryChange = () => {
    changeSalary(eachValue.salaryRangeId)
  }

  return (
    <li className="list-el">
      <input
        className="checkbox-el"
        type="radio"
        id={eachValue.salaryRangeId}
        name="salary"
        onChange={salaryChange}
      />
      <label htmlFor={eachValue.salaryRangeId}>{eachValue.label}</label>
    </li>
  )
}

export default SalaryList
