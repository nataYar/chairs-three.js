import React, { useRef } from 'react'
import { useGLTF , useTexture, Text } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function ChairCarousel({ url, position, rotation, scale, isActive, transform, backgroundUrl, label }) {
  const ref = useRef()
  const { scene } = useGLTF(url)
  const additionalRotation = transform ? [Math.PI / 2, 0, 0] : [0, 0, 0];
  if (!scene) return null // avoid rendering if scene didn't load
  const bgTexture = useTexture(backgroundUrl)
  
  // useFrame((state, delta) => {
  //   if (isActive && ref.current) {
  //     ref.current.rotation.y += delta * 0.15;
  //   }
  // });

  const finalRotation = [
    rotation[0] + additionalRotation[0],
    rotation[1] + additionalRotation[1],
    rotation[2] + additionalRotation[2],
  ];

  return (
    <group position={position} rotation={finalRotation} scale={isActive ? scale + 2 : scale} ref={ref}>
      {/* Background plane */}
      <mesh position={[0, 0, -5]} scale={[3, 3, 3]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={bgTexture} toneMapped={false} />
      </mesh>

      {/* Chair */}
      <primitive object={scene} />

      {/* Text below chair */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.1}
        color="blue"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
   
  )
}
