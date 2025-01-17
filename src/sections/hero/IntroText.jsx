import React, { useState, useEffect } from 'react'
import "../../styles/IntroText.scss";

const IntroText = ({ progress }) => {
    const isTextVisible = progress >= 1;

    const [isJumping, setIsJumping] = useState(false);

    useEffect(() => {
      if (progress >= 1) {
        setIsJumping(true);
      }
    }, [progress]);

  return (
    <div className={`intro-text ${isTextVisible ? 'visible' : ''}`}> 
    <h2>It all starts with a</h2>
    <div className='chair-container'>
        <h2 className='cha'>cha</h2>
        <h2>ir</h2>
        {/* <div className={`animation-container ${isTextVisible ? 'start-animation' : ''}`}>
           <div className={`letter-i ${isJumping ? "jump" : ""}`}>
            <div className="dot"></div>
            <div className="body"></div>
            <div className="leg upper-leg"></div>
            <div className="leg lower-leg"></div>
          </div>
          <div className="letter-r">r</div>
        </div> */}
    </div>
    

  </div>
  )
}

export default IntroText