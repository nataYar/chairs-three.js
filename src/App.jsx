import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.scss';
import Hero from './sections/hero/Hero';
import Office from './sections/office/Office';

function App() {
  return (
    <>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Hero />
        <Office />
      </div>
     </div>
    </>
  )
}

export default App
