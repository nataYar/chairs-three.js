import React, { Suspense, useRef, useEffect, useState } from "react";

import { useTransform, motion } from "framer-motion";
import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, a } from '@react-spring/three'

import SharedChairFigure from "./SharedChairFigure";


const SharedChair = ({ progress, officeRange, slidesRange, warholRange, isMobile }) => {

  const isVisible = true

  return isVisible ? (
    <motion.div
    className="shared-chair"
    style={{
      position: "absolute",
      width: "100vw",
      height: "100vh",
      // backgroundColor: "blue",
      top: '400vh',
      left: 0,
      zIndex: 100,
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
        zIndex: 100,
        // backgroundColor: "blue",
        pointerEvents: 'none',
        }}>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[7, 10, -36]}
            intensity= {9}
            castShadow 
          />
        <Suspense fallback={null}>
          <SharedChairFigure
            progress={progress}
            officeRange={officeRange}
            slidesRange={slidesRange}
            warholRange={warholRange}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  ) : null;
};

export default SharedChair;
