import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function ChairCarousel({ url, position, rotation, scale, isActive }) {
  const ref = useRef()
  const { scene } = useGLTF(url)

  if (!scene) return null // avoid rendering if scene didn't load
  
  useFrame((state, delta) => {
    if (isActive && ref.current) {
      ref.current.rotation.y += delta * 0.5; // Adjust speed here
    }
  });

  return (
    <group  object={scene} ref={ref} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}
