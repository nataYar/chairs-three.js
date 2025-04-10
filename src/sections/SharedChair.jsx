import React, { Suspense, useRef, useEffect, useState } from "react";

import { useTransform, motion } from "framer-motion";
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, a } from '@react-spring/three'

import SharedChairFigure from "./SharedChairFigure";


const SharedChair = ({ progress, officeRange, carouselRange, warholRange, isMobile }) => {


  // Animate Y position between Office and Carousel
  const y = useTransform(
    progress,
    [officeRange[1], carouselRange[0]],
    [0, -300]
  );

  // Scale it down as it enters Warhol
  const scale = useTransform(
    progress,
    [carouselRange[1], warholRange[0]],
    [1, 0.5]
  );

  // Optional: hide/show based on progress
  const isVisible = true
    // progress.get() >= officeRange[0] && progress.get() < warholRange[1];

  return isVisible ? (
    <motion.div
    className="shared-chair"
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      // backgroundColor: "blue",
      top: 0,
      left: 0,
      // y,
      // scale,
      zIndex: 98,
      pointerEvents: "none",
    }}
    >
      <Canvas 
      shadows 
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      style={{ 
        // position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99,
        backgroundColor: "blue",
        pointerEvents: 'none',
        }}>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[5, 50, -15]}
            intensity= {9}
            castShadow 
          />
        <Suspense fallback={null}>
          <SharedChairFigure
            progress={progress}
            officeRange={officeRange}
            carouselRange={carouselRange}
            warholRange={warholRange}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  ) : null;
};

export default SharedChair;
