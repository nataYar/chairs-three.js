import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMotionValueEvent } from 'framer-motion'
import { useSpring, a } from '@react-spring/three'

export default function SharedChairFigure({ progress, officeRange, isMobile }) {
  const group = useRef();
  const { scene } = useGLTF('src/assets/chairs/office_chair.glb');
  const { viewport } = useThree();

  const initialScale = isMobile ? 0.029 : 0.2;
  const [rotationY, setRotationY] = useState(0); // Initial rotation angle
  const [isScrolling, setIsScrolling] = useState(false); // Track if the user is scrolling
  const [lastRotationY, setLastRotationY] = useState(0); // Store last rotation value
  const [timer, setTimer] = useState(null); // Timer to detect when scrolling stops
  const [isStopped, setIsStopped] = useState(false); // Detect if user has stopped scrolling

  const initialPosition = isMobile
    ? [viewport.width * -0.44, -viewport.height * 0.55, 1]
    : [-viewport.width / 2 + 0.5, -viewport.height / 2 + 0.5, 0];

  const [spring, api] = useSpring(() => ({
    position: initialPosition,
    config: { mass: 0.5, tension: 2, friction: 7 },
  }));

  // Monitor the progress (scrolling) and change rotation
  // useMotionValueEvent(progress, 'change', (latest) => {
  //   if (latest >= officeRange[0] && latest <= officeRange[1]) {
  //     // The user is within the office range and scrolling
  //     if (!isScrolling) {
  //       setIsScrolling(true); // Start scrolling behavior
  //     }

  //     // If there's already a timer, clear it to reset
  //     if (timer) {
  //       clearTimeout(timer);
  //     }

  //     // Start a new timer to detect if the user stops scrolling
  //     setTimer(setTimeout(() => {
  //       setIsScrolling(false); // Stop rotation when user stops scrolling
  //       setIsStopped(true); // Mark that scrolling has stopped
  //     }, 300)); // 300 ms delay to detect scroll stop
  //   } else {
  //     // The user is outside the office range
  //     if (isScrolling) {
  //       setIsScrolling(false); // Stop scrolling behavior
  //     }
  //   }
  // });

  // Back and forth rotation logic
  // useFrame(() => {
    // if (isScrolling) {
      // const swingAngle = Math.sin(2) * 0.1 + Math.PI; // Back and forth
      // setRotationY(swingAngle); // Update rotation while scrolling
      // setLastRotationY(lastRotationY + 0.02); // Increment to continue the swing motion
    // }
  // });

  // Reset the stopped state when user starts scrolling again
  // useEffect(() => {
  //   if (isScrolling) {
  //     setIsStopped(false); // Reset stop flag when scrolling starts
  //   }
  // }, [isScrolling]);

  const time = useRef(0);
  const baseYRotation = Math.PI;
  const tiltZ = 0.09;
  
  useFrame((state, delta) => {
    time.current += delta;
    const swingY = Math.sin(time.current * 1.1) * 0.3; // Back and forth
  
    if (group.current) {
      group.current.rotation.set(0, baseYRotation + swingY, tiltZ);
    }
  });

  return (
    <a.group ref={group} position={spring.position} scale={initialScale} >
      <primitive object={scene} />
    </a.group>
  );
}