const SkillCard = props => {
  const {eachValue} = props

  return (
    <li className="skill-el">
      <img className="skill-logo" src={eachValue.image_url} alt="" />
      <p>{eachValue.name}</p>
    </li>
  )
}

export default SkillCard
