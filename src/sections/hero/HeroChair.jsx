import React, { forwardRef, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useThree, useFrame } from "@react-three/fiber";
import { useTransform } from "framer-motion";
import Chair from "./Chair";

const HeroChair = forwardRef((props, ref) => {
  const { progress, heroChairRef, ...otherProps } = props;

  const localRef = useRef();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { viewport } = useThree();

  // Map progress to [0, 1] for the first 20% of progress
  const heroProgress = useTransform(progress, [0, 0.2], [0, 1]);

  // Define rotation and scale
  const rotation = [0.4, 0.3, 0.1];
  const scale = isMobile ? 0.09 : 0.2;

  // Define positions based on viewport and device type
  const initialPosition = isMobile
    ? [viewport.width * 0.5, -viewport.height * -2.8, -25]
    : [viewport.width * 0, -viewport.height * -4.3, -35];
  const finalPosition = isMobile
    ? [viewport.width * 0.1, -viewport.height * -0.6, -10]
    : [viewport.width * 0, -viewport.height * -0.6, -10];

  // Single useFrame to handle both rotation and position
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Easing function
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Calculate eased progress based on heroProgress
    const progressValue = heroProgress.get(); // Get the current value of heroProgress
    const easedProgress = easeInOutCubic(progressValue);

    // Animate rotation (subtle oscillation effect)
    if (localRef.current) {
      localRef.current.rotation.x = rotation[0] + Math.sin(time * 1.2) * 0.02;
      localRef.current.rotation.y = rotation[1] + Math.cos(time * 1.1) * 0.02;
      localRef.current.rotation.z = rotation[2] + Math.sin(time * 1.5) * 0.02;
    }

    // Animate position (smooth interpolation)
    // if (heroChairRef.current) {
    //   heroChairRef.current.position.x =
    //     initialPosition[0] +
    //     (finalPosition[0] - initialPosition[0]) * easedProgress;
    //   heroChairRef.current.position.y =
    //     initialPosition[1] +
    //     (finalPosition[1] - initialPosition[1]) * easedProgress;
    //   heroChairRef.current.position.z =
    //     initialPosition[2] +
    //     (finalPosition[2] - initialPosition[2]) * easedProgress;
    // }
  });

  return (
    <Chair
      ref={(node) => {
        localRef.current = node; // Attach local ref
        if (ref) ref.current = node; // Forward parent ref
      }}
      modelPath="src/assets/chairs/office_chair.glb"
      scale={scale}
      position={initialPosition}
      rotation={rotation}
      castShadow={false}
      {...otherProps}
    />
  );
});

export default HeroChair;
