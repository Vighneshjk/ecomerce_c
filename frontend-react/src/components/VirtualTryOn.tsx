import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { X, Camera as CameraIcon, RefreshCw, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface VirtualTryOnProps {
    modelUrl: string;
    onExit: () => void;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ modelUrl, onExit }) => {
    const webcamRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const glassesModelRef = useRef<THREE.Group | null>(null);
    const faceMeshRef = useRef<FaceMesh | null>(null);
    const webCameraRef = useRef<Camera | null>(null);

    // Landmark Indices from Prompt
    // Nose bridge top: 168, Nose bridge bottom: 6
    // Left temple: 234, Right temple: 454
    // Left ear: 93, Right ear: 323
    // Left brow center: 105, Right brow center: 334

    useEffect(() => {
        if (!canvasRef.current || !webcamRef.current) return;

        const canvas = canvasRef.current;
        const video = webcamRef.current;

        // --- Three.js Setup ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);
        cameraRef.current = camera;

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
        dirLight.position.set(0, 5, 5);
        scene.add(dirLight);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;

        // --- Video Background Layer ---
        const bgScene = new THREE.Scene();
        const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        const bgMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
        const bgGeometry = new THREE.PlaneGeometry(2, 2);
        const videoMesh = new THREE.Mesh(bgGeometry, bgMaterial);
        bgScene.add(videoMesh);

        // --- Load Model ---
        const loader = new GLTFLoader();
        const url = modelUrl || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Glasses/glTF/Glasses.gltf';

        loader.load(url, (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            glassesModelRef.current = model;
            startMediaPipe();
        }, undefined, (err) => {
            console.error("3D Model load error:", err);
            setError("Failed to load 3D model. Please try again.");
        });

        const startMediaPipe = () => {
            const faceMesh = new FaceMesh({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
            });

            faceMesh.setOptions({
                maxNumFaces: 1,
                refineLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            faceMesh.onResults((results) => {
                setIsLoading(false);
                renderer.autoClear = false;
                renderer.clear();

                // Render Background
                renderer.render(bgScene, bgCamera);

                if (results.multiFaceLandmarks?.[0] && glassesModelRef.current) {
                    const landmarks = results.multiFaceLandmarks[0];

                    // Positioning Algorithm from Prompt
                    const noseTop = landmarks[168];
                    const leftTemple = landmarks[234];
                    const rightTemple = landmarks[454];

                    // Calculations
                    const frameWidth = Math.sqrt(
                        Math.pow(rightTemple.x - leftTemple.x, 2) +
                        Math.pow(rightTemple.y - leftTemple.y, 2)
                    );

                    const frameCenter = {
                        x: (leftTemple.x + rightTemple.x) / 2,
                        y: (leftTemple.y + rightTemple.y) / 2,
                        z: (leftTemple.z + rightTemple.z) / 2
                    };

                    // Map to 3D Space (Coordinate conversion)
                    const scaleFactor = 15;
                    const tx = (frameCenter.x - 0.5) * -15; // Invert X for mirror effect
                    const ty = (frameCenter.y - 0.5) * -15;
                    const tz = 5;

                    // Apply Transform
                    glassesModelRef.current.position.set(tx, ty, tz);

                    const modelScale = frameWidth * 12;
                    glassesModelRef.current.scale.set(modelScale, modelScale, modelScale);

                    // Rotation (Pose Estimation)
                    const angleZ = Math.atan2(rightTemple.y - leftTemple.y, rightTemple.x - leftTemple.x);
                    glassesModelRef.current.rotation.z = -angleZ;

                    // Tilt (Pitch) - based on nose to temple Y diff approx
                    const tilt = (noseTop.y - frameCenter.y) * 2;
                    glassesModelRef.current.rotation.x = tilt;
                }

                // Render Overlay
                renderer.render(scene, camera);
            });

            faceMeshRef.current = faceMesh;

            const cameraInstance = new Camera(video, {
                onFrame: async () => {
                    await faceMesh.send({ image: video });
                },
                width: 1280,
                height: 720
            });
            cameraInstance.start();
            webCameraRef.current = cameraInstance;
        };

        const handleResize = () => {
            if (!canvasRef.current) return;
            const w = canvasRef.current.clientWidth;
            const h = canvasRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            webCameraRef.current?.stop();
            faceMeshRef.current?.close();
            renderer.dispose();
        };
    }, [modelUrl]);

    const takeSnapshot = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = 'akeela-vision-tryon.png';
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className="relative w-full h-full bg-akeela-black group/tryon overflow-hidden rounded-[2rem] shadow-2xl">
            <video ref={webcamRef} className="hidden" playsInline muted></video>
            <canvas ref={canvasRef} className="w-full h-full object-cover"></canvas>

            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-akeela-black/80 backdrop-blur-md z-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-20 h-20 border-2 border-akeela-gold/20 border-t-akeela-gold rounded-full mb-8 shadow-2xl shadow-akeela-gold/20"
                    />
                    <h3 className="text-white text-2xl font-black uppercase tracking-[0.3em] brand-font">Analyzing Face</h3>
                    <p className="text-akeela-gold/60 text-xs mt-4 tracking-widest uppercase animate-pulse">Scanning 468 landmarks...</p>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-akeela-black/90 z-30 p-8 text-center">
                    <div className="bg-red-500/10 p-6 rounded-full mb-6">
                        <X className="text-red-500" size={32} />
                    </div>
                    <p className="text-white font-light italic text-xl mb-8">"{error}"</p>
                    <button onClick={onExit} className="btn-accent">Return to Collection</button>
                </div>
            )}

            {/* Controls Overlay */}
            <div className="absolute top-8 left-8 z-30 flex items-center gap-4">
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">AR Active</span>
                </div>
            </div>

            <div className="absolute top-8 right-8 flex flex-col gap-4 z-30">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onExit}
                    className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/10 transition-all"
                >
                    <X size={24} />
                </motion.button>
            </div>

            <div className="absolute bottom-12 inset-x-0 flex justify-center z-30 items-end gap-6">
                <motion.button
                    whileHover={{ y: -5 }}
                    className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/10"
                >
                    <Share2 size={20} />
                </motion.button>

                <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-[2.5rem] flex gap-4 border border-white/10">
                    <motion.button
                        onClick={takeSnapshot}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 bg-akeela-gold text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-akeela-gold/40 transition-transform"
                    >
                        <CameraIcon size={32} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 bg-white text-akeela-black rounded-[2rem] flex items-center justify-center shadow-lg transition-transform"
                    >
                        <RefreshCw size={32} />
                    </motion.button>
                </div>

                <motion.button
                    whileHover={{ y: -5 }}
                    onClick={takeSnapshot}
                    className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/10"
                >
                    <Download size={20} />
                </motion.button>
            </div>
        </div>
    );
};

export default VirtualTryOn;
