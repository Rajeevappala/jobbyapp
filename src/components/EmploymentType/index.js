import './index.css'

const EmploymentType = props => {
  const {employmentDetails, renderCheckBoxId} = props
  const {label, employmentTypeId} = employmentDetails

  const renderCheckBoxElement = event => {
    renderCheckBoxId(event.target.value)
  }

  return (
    <div>
      <li
        className="list-element"
        onChange={renderCheckBoxElement}
        key={employmentTypeId}
      >
        <input type="checkbox" id={employmentTypeId} value={employmentTypeId} />
        <label htmlFor={employmentTypeId}>{label}</label>
      </li>
    </div>
  )
}

export default EmploymentType
