'use client'

import { useState, useEffect, useRef } from 'react'
import { FaceDetectionResult } from './useFaceDetection'
import { normalizeToThreeCoords, smoothLandmarks } from '@/lib/tryon-utils'

export interface GlassesTransform {
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
}

export const useGlassesPosition = (
    faceData: FaceDetectionResult | null,
    videoWidth: number = 1280,
    videoHeight: number = 720
) => {
    const [transform, setTransform] = useState<GlassesTransform>({
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
    })

    const prevTransformRef = useRef<GlassesTransform>(transform)

    useEffect(() => {
        if (!faceData) return

        // Landmarks for position: Center between temples at nose bridge Y
        const noseBridge = normalizeToThreeCoords(faceData.noseBridge, videoWidth, videoHeight)
        const leftTemple = normalizeToThreeCoords(faceData.leftTemple, videoWidth, videoHeight)
        const rightTemple = normalizeToThreeCoords(faceData.rightTemple, videoWidth, videoHeight)

        // Position: Average horizontal, vertical at nose height, and Z offset
        const posX = (leftTemple.x + rightTemple.x) / 2
        const posY = noseBridge.y
        const posZ = noseBridge.z + 0.5 // Sit slightly in front of face

        // Rotation: From faceData headRotation (converted to radians)
        const rotX = (faceData.headRotation.pitch * Math.PI) / 180
        const rotY = (faceData.headRotation.yaw * Math.PI) / 180
        const rotZ = (faceData.headRotation.roll * Math.PI) / 180

        // Scale: Based on faceWidth relative to a standard (example standard: 0.15 normalized)
        const baseScale = 1.0
        const scaleFactor = (faceData.faceWidth / 0.15) * baseScale
        const s = scaleFactor

        // Alpha for smoothing
        const alpha = 0.3
        const smoothedPos: [number, number, number] = [
            smoothLandmarks(posX, prevTransformRef.current.position[0], alpha),
            smoothLandmarks(posY, prevTransformRef.current.position[1], alpha),
            smoothLandmarks(posZ, prevTransformRef.current.position[2], alpha),
        ]

        const smoothedRot: [number, number, number] = [
            smoothLandmarks(rotX, prevTransformRef.current.rotation[0], alpha),
            smoothLandmarks(rotY, prevTransformRef.current.rotation[1], alpha),
            smoothLandmarks(rotZ, prevTransformRef.current.rotation[2], alpha),
        ]

        const smoothedScale: [number, number, number] = [s, s, s]

        const nextTransform: GlassesTransform = {
            position: smoothedPos,
            rotation: smoothedRot,
            scale: smoothedScale,
        }

        setTransform(nextTransform)
        prevTransformRef.current = nextTransform
    }, [faceData, videoWidth, videoHeight])

    return transform
}
