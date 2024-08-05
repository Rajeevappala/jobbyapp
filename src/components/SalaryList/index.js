import './index.css'

const SalaryList = props => {
  const {salaryDetails, renderRadioEle} = props
  const {salaryRangeId, label} = salaryDetails

  const getRadioElementDetails = () => {
    renderRadioEle(salaryRangeId)
  }

  return (
    <div>
      <li className="list-element" onClick={getRadioElementDetails}>
        <input type="radio" id={salaryRangeId} name="salary" />
        <label htmlFor={salaryRangeId}>{label}</label>
      </li>
    </div>
  )
}

export default SalaryList
