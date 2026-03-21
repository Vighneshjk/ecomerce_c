import React, { useEffect, useRef, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import { Canvas } from '@react-three/fiber';
import { Eyewear3D } from './Eyewear3D';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCcw, X, Info, Sparkles } from 'lucide-react';
import { FaceShape } from '../types';
import { getEyewearRecommendation } from '../services/geminiService';

export const VirtualTryOn: React.FC<{ 
  onClose: () => void;
  onAnalysisComplete?: (shape: FaceShape) => void;
}> = ({ onClose, onAnalysisComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faceShape, setFaceShape] = useState<FaceShape>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [glassesTransform, setGlassesTransform] = useState<{
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }>({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [0.08, 0.08, 0.08],
  });

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        
        const bridge = landmarks[168];
        const leftEye = landmarks[33];
        const rightEye = landmarks[263];

        const aspect = 1.333; // 4/3 aspect ratio
        const dx = (rightEye.x - leftEye.x) * aspect;
        const dy = rightEye.y - leftEye.y;
        const angle = Math.atan2(dy, dx);

        const eyeDist = Math.sqrt(dx * dx + dy * dy);
        const scaleVal = eyeDist * 1.8; // Reduced from 2.2 for better fit

        const x = (bridge.x - 0.5) * 2 * aspect;
        const y = -(bridge.y - 0.5) * 2;
        const z = 1.0 - eyeDist * 2; // Move slightly back based on distance

        setGlassesTransform({
          position: [x, y, z],
          rotation: [0, 0, -angle],
          scale: [scaleVal, scaleVal, scaleVal],
        });

        if (!faceShape && !isAnalyzing) {
          analyzeFaceShape(landmarks);
        }
        
        if (!isLoaded) setIsLoaded(true);
      }
    });

    if (videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            try {
              await faceMesh.send({ image: videoRef.current });
            } catch (err) {
              console.error("FaceMesh error:", err);
            }
          }
        },
        width: 640,
        height: 480,
      });
      
      camera.start().catch((err: any) => {
        console.error("Camera start error:", err);
        if (err.name === 'NotAllowedError' || err.message?.includes('Permission denied')) {
          setError("Camera access denied. Please enable camera permissions in your browser settings and try again.");
        } else {
          setError("Failed to start camera. Please ensure no other app is using it.");
        }
      });
    }

    return () => {
      faceMesh.close();
    };
  }, []);

  const analyzeFaceShape = async (landmarks: any[]) => {
    setIsAnalyzing(true);
    const height = Math.abs(landmarks[10].y - landmarks[152].y);
    const width = Math.abs(landmarks[234].x - landmarks[454].x);
    const ratio = height / width;

    let shape: FaceShape = 'Oval';
    if (ratio > 1.5) shape = 'Oval';
    else if (ratio < 1.2) shape = 'Round';
    else shape = 'Square';

    setFaceShape(shape);
    if (onAnalysisComplete) onAnalysisComplete(shape);
    const rec = await getEyewearRecommendation(shape);
    setRecommendation(rec);
    setIsAnalyzing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
    >
      <div className="relative w-full max-w-4xl aspect-[4/3] bg-obsidian border border-white/10 overflow-hidden shadow-2xl">
        <video 
          ref={videoRef} 
          className="absolute inset-0 w-full h-full object-contain opacity-60 grayscale"
          autoPlay 
          playsInline
        />

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-obsidian/90 z-20 p-8 text-center">
            <div className="max-w-md">
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="text-rose-500" size={32} />
              </div>
              <h3 className="text-xl font-display mb-4">Camera Access Required</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary py-3 px-8"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none z-10">
          <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, 10, 5]} intensity={1} />
            {isLoaded && (
              <group 
                position={glassesTransform.position} 
                rotation={glassesTransform.rotation} 
                scale={glassesTransform.scale}
              >
                <Eyewear3D color="#D4AF37" style="Square" />
              </group>
            )}
          </Canvas>
        </div>

        <div className="absolute top-6 right-6 flex gap-4">
          <button 
            onClick={onClose}
            className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-8">
          <div className="glass p-6 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs uppercase tracking-widest text-white/50">Vision AI Analysis</h3>
            </div>
            
            <AnimatePresence mode="wait">
              {faceShape ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key="result"
                >
                  <p className="text-lg font-display mb-2">Detected: {faceShape} Structure</p>
                  {recommendation ? (
                    <div className="flex gap-3">
                      <Sparkles className="text-gold shrink-0" size={18} />
                      <p className="text-xs text-white/60 leading-relaxed italic">
                        {recommendation}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/30">
                      <RefreshCcw size={12} className="animate-spin" />
                      <span className="text-[10px] uppercase tracking-widest">Generating Stylist Insights</span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <p className="text-sm font-medium text-white/40 animate-pulse">
                  Analyzing facial architecture...
                </p>
              )}
            </AnimatePresence>
          </div>

          {!isLoaded && (
            <div className="flex flex-col items-center gap-4 mb-12">
              <RefreshCcw className="animate-spin text-white/20" size={48} />
              <p className="text-sm text-white/40 uppercase tracking-widest">Calibrating AR Engine</p>
            </div>
          )}
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
};

