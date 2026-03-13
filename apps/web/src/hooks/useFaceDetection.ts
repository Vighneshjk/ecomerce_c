'use client'

import { useRef, useEffect, useState, useCallback, RefObject } from 'react'
import type { FaceMesh, NormalizedLandmark, Results, Options } from '@mediapipe/face_mesh'
import type { Camera } from '@mediapipe/camera_utils'
import { computeHeadPose } from '@/lib/tryon-utils'

// @ts-ignore
let FaceMeshModule: any;
// @ts-ignore
let CameraModule: any;

export interface FaceDetectionResult {
    landmarks: NormalizedLandmark[]
    noseBridge: { x: number; y: number; z: number }
    leftTemple: { x: number; y: number; z: number }
    rightTemple: { x: number; y: number; z: number }
    leftEyeCenter: { x: number; y: number; z: number }
    rightEyeCenter: { x: number; y: number; z: number }
    faceWidth: number
    faceHeight: number
    interPupillaryDistance: number
    headRotation: { pitch: number; yaw: number; roll: number }
}

export const useFaceDetection = (videoRef: RefObject<HTMLVideoElement | null>) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isDetecting, setIsDetecting] = useState(false)
    const [faceData, setFaceData] = useState<FaceDetectionResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const faceMeshRef = useRef<FaceMesh | null>(null)
    const cameraRef = useRef<Camera | null>(null)

    const onResults = useCallback((results: Results) => {
        if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
            setFaceData(null)
            setIsDetecting(false)
            return
        }

        setIsDetecting(true)
        const landmarks = results.multiFaceLandmarks[0]

        // Indices:
        // Nose bridge top: 6
        // Nose bridge bottom: 197
        // Left temple: 234
        // Right temple: 454
        // Pupils center (468 left, 473 right)

        const leftTemple = landmarks[234]
        const rightTemple = landmarks[454]
        const noseBridge = landmarks[6]
        const leftPupil = landmarks[468] || landmarks[133] // Fallback
        const rightPupil = landmarks[473] || landmarks[362]

        const faceWidth = Math.sqrt(
            Math.pow(rightTemple.x - leftTemple.x, 2) +
            Math.pow(rightTemple.y - leftTemple.y, 2)
        )

        const faceHeight = Math.sqrt(
            Math.pow(landmarks[152].x - landmarks[10].x, 2) +
            Math.pow(landmarks[152].y - landmarks[10].y, 2)
        )

        // Rough pixel IPD for video scale
        const videoWidth = videoRef.current?.videoWidth || 640
        const ipd = Math.sqrt(
            Math.pow(rightPupil.x - leftPupil.x, 2) +
            Math.pow(rightPupil.y - leftPupil.y, 2)
        ) * videoWidth

        setFaceData({
            landmarks,
            noseBridge,
            leftTemple,
            rightTemple,
            leftEyeCenter: leftPupil,
            rightEyeCenter: rightPupil,
            faceWidth,
            faceHeight,
            interPupillaryDistance: ipd,
            headRotation: computeHeadPose(landmarks)
        })
    }, [videoRef])

    useEffect(() => {
        if (typeof window === 'undefined') return

        let isMounted = true

        const init = async () => {
            try {
                // Dynamic import to avoid build-time resolution issues with non-standard exports
                const FaceMesh = (await import('@mediapipe/face_mesh')).FaceMesh;
                const { Camera } = await import('@mediapipe/camera_utils');

                const faceMesh = new FaceMesh({
                    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
                })

                const options: Options = {
                    maxNumFaces: 1,
                    refineLandmarks: true,
                    minDetectionConfidence: 0.7,
                    minTrackingConfidence: 0.7,
                }

                faceMesh.setOptions(options)
                faceMesh.onResults(onResults)
                faceMeshRef.current = faceMesh

                if (videoRef.current) {
                    const camera = new Camera(videoRef.current, {
                        onFrame: async () => {
                            if (videoRef.current && faceMeshRef.current) {
                                await faceMeshRef.current.send({ image: videoRef.current })
                            }
                        },
                        width: 1280,
                        height: 720,
                    })

                    cameraRef.current = camera
                    await camera.start()
                    if (isMounted) setIsLoading(false)
                }
            } catch (err: any) {
                console.error('FaceMesh Init Error:', err)
                setError(err.message || 'Failed to initialize camera. Please check permissions.')
                setIsLoading(false)
            }
        }

        init()

        return () => {
            isMounted = false
            cameraRef.current?.stop()
            faceMeshRef.current?.close()
        }
    }, [onResults, videoRef])

    return { isLoading, isDetecting, faceData, error }
}
