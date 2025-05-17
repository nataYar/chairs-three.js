// ChairScene.jsx
import React, { useRef, Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'

export default function StoreItem({ modelPath, scale = 0.04, position = [0, 0, 0], rotation = [0.2, 0.3, 0] }) {
  const group = useRef()
  const { scene } = useGLTF(modelPath)

  const spring = useSpring({
    position,
    scale,
    rotation,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  return (
    <Suspense fallback={null}>
      <a.group
        ref={group}
        position={spring.position}
        scale={spring.scale}
        rotation={spring.rotation}
        style={{ 
            width: '100%',
            height: '100%',
            }}
      >
        <primitive object={scene} />
      </a.group>
    </Suspense>
  )
}
