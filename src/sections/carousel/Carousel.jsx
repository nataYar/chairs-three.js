import React from 'react'
import BackgroundSlider from './BackgroundSlider'
import { motion, useScroll, useSpring } from "framer-motion";
import "../../styles/Carousel.scss";
import '../../styles/Carousel.scss'

const Carousel = () => {
    const backgrounds = [
        "src/assets/carousel/office.jpg",
        "src/assets/carousel/art-studio.jpg",
        "src/assets/carousel/underwater.jpg",
        "src/assets/carousel/shelves.jpg",
        "src/assets/carousel/disco.jpg",
      ];

  return (
    <div className='carousel-container '>
        <div className="scroll-container">
            {backgrounds.map((bg, index) => (
                <motion.div
                    key={index}
                    className="background"
                    style={{ backgroundImage: bg }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
            ))}
            <img src="src/assets/carousel/chair.png" alt="Hero Chair" className="hero-chair" />
        </div>
    </div>
    

//     <div className="carousel-container">
//         <div className="hero-chair">
//           <img src="src/assets/carousel/chair.png" alt="Hero Chair" />
//         </div>
//         <BackgroundSlider />
//   </div>
  )
}

export default Carousel