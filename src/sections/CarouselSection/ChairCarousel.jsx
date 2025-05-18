import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function ChairCarousel({ url, position, rotation, scale, isActive, transform }) {
  const ref = useRef()
  const { scene } = useGLTF(url)
  const additionalRotation = transform ? [Math.PI / 2, 0, 0] : [0, 0, 0];
  if (!scene) return null // avoid rendering if scene didn't load
  
  useFrame((state, delta) => {
    if (isActive && ref.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });

  const finalRotation = [
    rotation[0] + additionalRotation[0],
    rotation[1] + additionalRotation[1],
    rotation[2] + additionalRotation[2],
  ];

  return (
    <group  object={scene} ref={ref} position={position} rotation={finalRotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}
