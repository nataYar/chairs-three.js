import { useState } from 'react'
import './styles/App.scss';
import Hero from './sections/hero/Hero';
import Main from './sections/main/Main';

function App() {
  const [isHeroAnimatedOut, setIsHeroAnimatedOut] = useState(false);

  function setHeroComplete(){
    setIsHeroAnimatedOut(prev => !prev)
  }
  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content app-container">
          <Hero 
          isHeroAnimatedOut={isHeroAnimatedOut} 
          onHeroAnimationComplete={setHeroComplete}/>
          {/* <Main isHeroAnimatedOut={isHeroAnimatedOut}/> */}
        </div>
      </div>
    </>
  )
}

export default App
