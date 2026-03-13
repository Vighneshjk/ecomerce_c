import { useGLTF } from '@react-three/drei'

export const MODEL_REGISTRY: Record<string, string> = {
    '1': '/models/aviator.glb',
    '2': '/models/round.glb',
    '3': '/models/cateye.glb',
    '4': '/models/rectangle.glb',
    '5': '/models/square.glb',
}

/**
 * Preloads models for smoother try-on experience
 */
export const preloadModels = (ids: string[]) => {
    ids.forEach(id => {
        const url = MODEL_REGISTRY[id]
        if (url) {
            useGLTF.preload(url)
        }
    })
}

/**
 * Gets model URL for a specific product ID
 */
export const getModelUrl = (productId: string) => {
    return MODEL_REGISTRY[productId] || MODEL_REGISTRY['1']
}
