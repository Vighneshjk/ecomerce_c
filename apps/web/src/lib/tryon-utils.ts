import { NormalizedLandmark } from '@mediapipe/face_mesh'
import * as THREE from 'three'

/**
 * Normalizes 2D/normalized landmark coordinates to Three.js scene coordinates
 */
export const normalizeToThreeCoords = (
    landmark: { x: number; y: number; z: number },
    videoWidth: number,
    videoHeight: number,
    fov: number = 45,
    distance: number = 5
) => {
    // MediaPipe coordinates: x, y in [0, 1]. x=0 is left, y=0 is top.
    // Three.js: x=0 is center, y=0 is center. x goes positive right, y goes positive up.

    // Convert normalized [0, 1] to [-1, 1]
    const x = (landmark.x - 0.5) * 2
    const y = (0.5 - landmark.y) * 2 // Flip Y

    // Calculate visible height/width at 'distance'
    const vFOV = (fov * Math.PI) / 180
    const visibleHeight = 2 * Math.tan(vFOV / 2) * distance
    const aspect = videoWidth / videoHeight
    const visibleWidth = visibleHeight * aspect

    return {
        x: x * (visibleWidth / 2),
        y: y * (visibleHeight / 2),
        z: -landmark.z * (visibleWidth / 2) // Approximate Z depth based on width
    }
}

/**
 * Calculates Interpupillary Distance (IPD) in pixels
 */
export const calculatePD = (
    leftPupil: { x: number; y: number },
    rightPupil: { x: number; y: number },
    imageWidth: number
) => {
    const dx = (rightPupil.x - leftPupil.x) * imageWidth
    const dy = (rightPupil.y - leftPupil.y) * imageWidth
    return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Smooths values using exponential moving average
 */
export const smoothLandmarks = (
    current: number,
    previous: number,
    alpha: number = 0.3
) => {
    return current * alpha + previous * (1 - alpha)
}

/**
 * Computes head Pose (Pitch, Yaw, Roll) in degrees
 */
export const computeHeadPose = (landmarks: NormalizedLandmark[]) => {
    // Simplified pose estimation based on landmarks
    // 1: Nose Tip, 152: Chin, 33: Left Eye Outer, 263: Right Eye Outer, 61: Left Mouth, 291: Right Mouth

    // Yaw: Difference between nose and horizontal center of face
    const leftEye = landmarks[130]
    const rightEye = landmarks[359]
    const nose = landmarks[1]

    const eyeCenter = (leftEye.x + rightEye.x) / 2
    const yaw = (nose.x - eyeCenter) * 100 // Scale to approx degrees

    // Pitch: Vertical position of nose relative to eyes/chin
    const chin = landmarks[152]
    const forehead = landmarks[10]
    const verticalCenter = (chin.y + forehead.y) / 2
    const pitch = (nose.y - verticalCenter) * 100

    // Roll: Angle between eyes
    const roll = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x) * (180 / Math.PI)

    return { pitch, yaw, roll }
}
