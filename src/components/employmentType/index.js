const EmploymentType = props => {
  const {eachValue, changeType} = props

  const sendValue = () => {
    changeType(eachValue.employmentTypeId)
  }

  return (
    <li className="list-el">
      <input
        className="checkbox-el"
        type="checkbox"
        id={eachValue.employmentTypeId}
        name="employment"
        value={eachValue.employmentTypeId}
        onChange={sendValue}
      />
      <label htmlFor={eachValue.employmentTypeId}>{eachValue.label}</label>
    </li>
  )
}

export default EmploymentType
