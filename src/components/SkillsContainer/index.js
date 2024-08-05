import './index.css'

const SkillsContainer = props => {
  const {skillsListDetails} = props
  const {name, imageUrlEle} = skillsListDetails

  return (
    <li className="list-element">
      <img src={imageUrlEle} alt={name} className="skill-img" />
      <h1 className="name-ele">{name}</h1>
    </li>
  )
}

export default SkillsContainer
