import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export type EyewearStyle = 'Round' | 'Square' | 'Aviator';

export const Eyewear3D: React.FC<{ 
  color?: string; 
  scale?: [number, number, number];
  style?: EyewearStyle;
}> = ({ 
  color = '#000000', 
  scale = [1, 1, 1],
  style = 'Square'
}) => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current && !scale.every(s => s !== 1)) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const renderFrame = () => {
    switch (style) {
      case 'Round':
        return (
          <>
            <mesh position={[-0.6, 0, 0]}>
              <torusGeometry args={[0.4, 0.05, 16, 32]} />
              <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
            <mesh position={[0.6, 0, 0]}>
              <torusGeometry args={[0.4, 0.05, 16, 32]} />
              <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
          </>
        );
      case 'Aviator':
        return (
          <>
            <mesh position={[-0.6, -0.1, 0]} rotation={[0, 0, 0.2]}>
              <torusGeometry args={[0.45, 0.04, 16, 32]} />
              <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
            <mesh position={[0.6, -0.1, 0]} rotation={[0, 0, -0.2]}>
              <torusGeometry args={[0.45, 0.04, 16, 32]} />
              <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
          </>
        );
      default: // Square
        return (
          <>
            <mesh position={[-0.6, 0, 0]}>
              <boxGeometry args={[0.8, 0.8, 0.05]} />
              <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
            <mesh position={[0.6, 0, 0]}>
              <boxGeometry args={[0.8, 0.8, 0.05]} />
              <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
          </>
        );
    }
  };

  return (
    <group ref={groupRef} scale={scale}>
      {renderFrame()}

      {/* Bridge */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Temples */}
      <mesh position={[-1, 0.1, -0.6]} rotation={[Math.PI / 2, 0, 0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[1, 0.1, -0.6]} rotation={[Math.PI / 2, 0, -0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Lenses */}
      <mesh position={[-0.6, 0, 0.02]}>
        <circleGeometry args={[0.38, 32]} />
        <meshPhysicalMaterial 
          color="#111" 
          transparent 
          opacity={0.7} 
          roughness={0} 
          metalness={0.9}
          transmission={0.3}
          thickness={0.5}
        />
      </mesh>
      <mesh position={[0.6, 0, 0.02]}>
        <circleGeometry args={[0.38, 32]} />
        <meshPhysicalMaterial 
          color="#111" 
          transparent 
          opacity={0.7} 
          roughness={0} 
          metalness={0.9}
          transmission={0.3}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
};
