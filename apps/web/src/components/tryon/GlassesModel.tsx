'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { GlassesTransform } from '@/hooks/useGlassesPosition'

interface GlassesModelProps {
    modelUrl: string
    transform: GlassesTransform
    frameColor?: string
    lensColor?: string
    lensOpacity?: number
}

export function GlassesModel({
    modelUrl,
    transform,
    frameColor = '#FFD700', // Default gold
    lensColor = '#000000',
    lensOpacity = 0.6,
}: GlassesModelProps) {
    const groupRef = useRef<THREE.Group>(null)
    const { scene } = useGLTF(modelUrl) as any

    // Copy to avoid modifying original scene if needed
    const modelScene = scene.clone()

    useEffect(() => {
        modelScene.traverse((node: any) => {
            if (node.isMesh) {
                const name = node.name.toLowerCase()

                // Frames: Applying color and generic characteristics
                if (name.includes('frame') || name.includes('temple')) {
                    node.material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color(frameColor),
                        metalness: 0.8,
                        roughness: 0.2,
                    })
                }

                // Lenses: PhysicalMaterial for transparency/transmission
                if (name.includes('lens')) {
                    node.material = new THREE.MeshPhysicalMaterial({
                        color: new THREE.Color(lensColor),
                        transparent: true,
                        opacity: lensOpacity,
                        roughness: 0.05,
                        transmission: 0.5,
                        thickness: 0.1,
                    })
                }
            }
        })
    }, [modelScene, frameColor, lensColor, lensOpacity])

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Smooth Lerp for transform
        groupRef.current.position.lerp(new THREE.Vector3(...transform.position), 0.3)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, transform.rotation[0], 0.3)
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, transform.rotation[1], 0.3)
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, transform.rotation[2], 0.3)

        const scaleVal = transform.scale[0]
        groupRef.current.scale.lerp(new THREE.Vector3(scaleVal, scaleVal, scaleVal), 0.3)
    })

    return (
        <group ref={groupRef}>
            <primitive object={modelScene} />
        </group>
    )
}

// Preload standard models to avoid lag
// useGLTF.preload('/models/...glb')
