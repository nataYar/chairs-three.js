import React from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import "../styles/AfterOffice.scss"

const AfterOffice = ({ progress, afterOfficeRange }) => {

  const currentProgress = useTransform(progress, afterOfficeRange, [0, 1]);

  const springConfig = { mass: 0.5, stiffness: 100, damping: 40, restDelta: 0.001 };

  // Define the pixel values for the y-axis transformation.
  const startY = window.innerHeight * 0.1; // Equivalent to 30vh
  const endY = window.innerHeight * 0.7; // Equivalent to 80vh

  const rawY = useTransform(currentProgress, [0.4, 0.8], [startY, endY]);

  // Wrap the transform with a spring for smooth motion
  const springY = useSpring(rawY, springConfig);

  return (
  <div 
  className="after-office">
     <motion.div
            className="carousel-text-container"
            initial={{ opacity: 0, y: "10vh" }}
            style={{
              opacity: useTransform(currentProgress, [0.2, 0.8], [0, 1]),
              y: springY,
            }}
            >
        <div className="carousel-text">
            <h2 className='first'>
                <span>One</span> 
                <br/>
            Chair,
            </h2>
            <h2
             >
                <br/>
                    <span>Infinite </span> 
                    <br/>
                Contexts
            </h2>
        </div>
      </motion.div>
  </div>
)
}

export default AfterOffice