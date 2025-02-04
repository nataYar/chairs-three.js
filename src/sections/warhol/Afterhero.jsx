import React from 'react'
import "../../styles/Afterhero.scss"

const Afterhero = ({ progress, isVisible }) => {
  return (
    <div className={`afterhero ${isVisible ? 'visible' : ''}`}>Afterhero</div>
  )
}

export default Afterhero