import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMotionValueEvent } from 'framer-motion'
import { useSpring, a } from '@react-spring/three'

export default function SharedChairFigure({ progress, officeRange, isMobile }) {
  const group = useRef()
  const { scene } = useGLTF('src/assets/chairs/office_chair.glb')
  const { viewport } = useThree()

  const initialScale = isMobile ? 0.03 : 0.2
  const [shouldRotate, setShouldRotate] = useState(false)
  const [shouldSpin, setShouldSpin] = useState(false)
  const [rotationY, setRotationY] = useState(3)

  const initialPosition = isMobile
    ? [ viewport.width * -0.44, 
      -viewport.height * 0.55, 
      1]
    : [-viewport.width / 2 + 0.5, -viewport.height / 2 + 0.5, 0]

  const officeEndPosition = isMobile
    ? [viewport.width * 1, -viewport.height * 0.55, 1]
    : [viewport.width * -0.37, -viewport.height * 0.7, 1]

  const [spring, api] = useSpring(() => ({
    position: initialPosition,
    config: { mass: 0.5, tension: 2, friction: 7 },
  }))

  useMotionValueEvent(progress, 'change', latest => {
    if (latest < officeRange[1] - 0.1) {
      setShouldRotate(true)
      setShouldSpin(false)
      api.start({ position: initialPosition })
    } else if (latest >= officeRange[1] - 0.5) {
      setShouldRotate(true) 
      setShouldSpin(false)  
      api.start({ position: officeEndPosition})
    }
  })
  

  useFrame(() => {
    if (shouldRotate) {
      // Faster spin during movement
      setRotationY(prev => prev + 0.01)
    } else if (shouldSpin) {
      // Slower spin in place
      setRotationY(prev => prev + 0.05)
    }
  })
  
  

  return (
    <a.group
      ref={group}
      position={spring.position}
      scale={initialScale}
      rotation={[-0.2, rotationY, 0]}
    >
      <primitive object={scene} />
    </a.group>
  )
}
