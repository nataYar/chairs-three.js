import React from 'react'
import { Canvas } from '@react-three/fiber'
import StoreItem from './StoreItem';

const Item1 = () => {
    return (
        <Canvas 
              shadows 
              camera={{
                position: [0, 0, 5],
                fov: 75,
                near: 0.1,
                far: 100,
              }}
              style={{ 
                top: 0,
                left: 0,
                width: '100%',
                height: '70vh',
                // zIndex: 100,
                backgroundColor: "blue",
                // pointerEvents: 'none',
                }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight 
                    position={[7, 10, -36]}
                    intensity= {9}
                    castShadow 
                  />
                  <StoreItem modelPath='src/assets/chairs/office_chair.glb'/>
              </Canvas>
    )
}

export default Item1