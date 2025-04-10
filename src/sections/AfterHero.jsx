import React from 'react'
import "../styles/Afterhero.scss"

const AfterHero = ({  isVisible }) => {
  return (
    <div className={`afterhero ${isVisible ? 'visible' : ''}`}>Afterhero</div>
  )
}

export default AfterHero