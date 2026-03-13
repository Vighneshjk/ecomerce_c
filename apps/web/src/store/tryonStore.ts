import { create } from 'zustand'

export interface GlassesModel {
    productId: string
    name: string
    modelUrl: string
    colorName: string
    colorHex: string
}

interface TryonStore {
    isActive: boolean
    selectedGlasses: GlassesModel | null
    availableGlasses: GlassesModel[]
    faceDetected: boolean
    isCameraReady: boolean
    isMirrored: boolean
    setSelectedGlasses: (glasses: GlassesModel | null) => void
    setFaceDetected: (detected: boolean) => void
    setCameraReady: (ready: boolean) => void
    toggleMirror: () => void
    startTryon: () => void
    stopTryon: () => void
    loadGlassesList: (glasses: GlassesModel[]) => void
}

export const useTryonStore = create<TryonStore>((set) => ({
    isActive: false,
    selectedGlasses: null,
    availableGlasses: [],
    faceDetected: false,
    isCameraReady: false,
    isMirrored: false,
    setSelectedGlasses: (glasses) => set({ selectedGlasses: glasses }),
    setFaceDetected: (detected) => set({ faceDetected: detected }),
    setCameraReady: (ready) => set({ isCameraReady: ready }),
    toggleMirror: () => set((state) => ({ isMirrored: !state.isMirrored })),
    startTryon: () => set({ isActive: true }),
    stopTryon: () => set({ isActive: false }),
    loadGlassesList: (glasses) => set({ availableGlasses: glasses }),
}))
