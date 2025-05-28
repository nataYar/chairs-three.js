import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export default function ChairCarousel({
  url,
  position,
  rotation,
  scale,
  isActive,
  transform
}) {
  const ref = useRef()
  const { scene } = useGLTF(url)
  const additionalRotation = transform ? [Math.PI / 2, 0, 0] : [0, 0, 0]

  if (!scene) return null

  useFrame((state, delta) => {
    if (isActive && ref.current) {
      ref.current.rotation.y += delta * 0.1
    }
  })

  const finalRotation = [
    rotation[0] + additionalRotation[0],
    rotation[1] + additionalRotation[1],
    rotation[2] + additionalRotation[2],
  ]

  return (
    <>
      <group
        position={position}
        rotation={finalRotation}
        scale={isActive ? scale + 2 : scale}
        ref={ref}
      >
        <primitive object={scene} />
      </group>
    </>
  )
}
