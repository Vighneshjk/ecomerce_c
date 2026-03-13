import { useTryonStore } from "@/store/tryonStore"

export const useTryon = () => {
    const store = useTryonStore()

    return {
        isActive: store.isActive,
        selectedGlasses: store.selectedGlasses,
        availableGlasses: store.availableGlasses,
        faceDetected: store.faceDetected,
        isCameraReady: store.isCameraReady,
        isMirrored: store.isMirrored,
        setSelectedGlasses: store.setSelectedGlasses,
        setFaceDetected: store.setFaceDetected,
        setCameraReady: store.setCameraReady,
        toggleMirror: store.toggleMirror,
        startTryon: store.startTryon,
        stopTryon: store.stopTryon,
        loadGlassesList: store.loadGlassesList,
    }
}
