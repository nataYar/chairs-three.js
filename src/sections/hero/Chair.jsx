import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Chair = forwardRef(({ modelPath, scale, position, rotation, castShadow = true }, ref) => {
    const { scene } = useGLTF(modelPath);
    const clonedScene = scene.clone();
     // Enable shadows for all child meshes
     clonedScene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = castShadow; 
            child.receiveShadow = true; 
        }
    });

    return (
        <primitive
            ref={ref}
            object={clonedScene}
            scale={scale}
            position={position}
            rotation={rotation}
        />
    );
});
export default Chair;