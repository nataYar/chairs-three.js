import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.scss';
import Hero from './sections/hero/Hero';

function App() {


  return (
    <>
    <div id="smooth-wrapper">
      <div id="smooth-content">
      <section className='Hero'>
        <Hero />
      </section>
     
      </div>
     </div>
    </>
  )
}

export default App
