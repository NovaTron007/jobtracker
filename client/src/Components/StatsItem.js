import React from 'react'
import Wrapper from "../assets/Wrappers/StatItem"

const StatsItem = ({title, count, icon, color, bcg}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper> // pass colors from props to styled component
  )
}

export default StatsItem