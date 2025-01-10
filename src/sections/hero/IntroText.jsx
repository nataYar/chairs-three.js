import React from 'react'
import "../../styles/sections/IntroText.scss";

const IntroText = ({ progress }) => {
    const isTextVisible = progress >= 1;

  return (
    <div className={`intro-text ${isTextVisible ? 'visible' : ''}`}> 
    <h2>Step into a world where the unassuming chair transforms into a symbol of infinite possibility.</h2>
  </div>
  )
}

export default IntroText