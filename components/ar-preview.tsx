'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Download, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface ARPreviewProps {
  tattooImage: string;
  onBack: () => void;
}

export function ARPreview({ tattooImage, onBack }: ARPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [tattooPosition, setTattooPosition] = useState({ x: 50, y: 50 });
  const [tattooSize, setTattooSize] = useState([50]);
  const [tattooRotation, setTattooRotation] = useState([0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsPreviewActive(true);
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to access camera';
      setCameraError(errorMessage);
      console.error('Camera access error:', error);
      
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        toast.error('Camera access denied. Please enable camera permissions and refresh the page.');
      } else if (errorMessage.includes('NotFoundError')) {
        toast.error('No camera found. Please connect a camera and try again.');
      } else {
        toast.error('Failed to access camera. Please check your camera settings.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsPreviewActive(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPreviewActive) return;
    setIsDragging(true);
    updateTattooPosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isPreviewActive) return;
    updateTattooPosition(e);
  };

  const updateTattooPosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTattooPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isPreviewActive) {
      toast.error('Camera not ready for capture');
      return;
    }

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        toast.error('Failed to get canvas context');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame
      ctx.drawImage(video, 0, 0);
      
      // Create tattoo overlay
      const tattooImg = new Image();
      tattooImg.onload = () => {
        const tattooWidth = (tattooSize[0] / 100) * canvas.width * 0.3;
        const tattooHeight = (tattooImg.height / tattooImg.width) * tattooWidth;
        const tattooX = (tattooPosition.x / 100) * canvas.width - tattooWidth / 2;
        const tattooY = (tattooPosition.y / 100) * canvas.height - tattooHeight / 2;

        ctx.save();
        ctx.translate(tattooX + tattooWidth / 2, tattooY + tattooHeight / 2);
        ctx.rotate((tattooRotation[0] * Math.PI) / 180);
        ctx.globalAlpha = 0.8;
        ctx.drawImage(tattooImg, -tattooWidth / 2, -tattooHeight / 2, tattooWidth, tattooHeight);
        ctx.restore();

        // Download the image
        const link = document.createElement('a');
        link.download = `tattoo-ar-preview-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success('Photo captured with tattoo preview!');
      };
      
      tattooImg.onerror = () => {
        toast.error('Failed to load tattoo image for capture');
      };
      
      tattooImg.src = tattooImage;
    } catch (error) {
      console.error('Capture error:', error);
      toast.error('Failed to capture photo');
    }
  };

  const resetPosition = () => {
    setTattooPosition({ x: 50, y: 50 });
    setTattooSize([50]);
    setTattooRotation([0]);
    toast.info('Position reset to center');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold gradient-text">AR Preview</h1>
        <div className="w-20"></div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6">
        {/* Camera Preview */}
        <div className="flex-1">
          <Card className="glass-effect p-4 h-full">
            <div 
              className="relative w-full aspect-video bg-black rounded-lg overflow-hidden cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {!cameraError ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                    <div>
                      <p className="text-red-400 font-semibold mb-2">Camera Error</p>
                      <p className="text-muted-foreground text-sm">{cameraError}</p>
                      <Button
                        onClick={startCamera}
                        variant="outline"
                        size="sm"
                        className="mt-4 border-red-500/50 hover:bg-red-500/10"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Tattoo Overlay */}
              {isPreviewActive && !cameraError && tattooImage && (
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${tattooPosition.x}%`,
                    top: `${tattooPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={tattooImage}
                    alt="Tattoo Preview"
                    className="max-w-none"
                    style={{
                      width: `${tattooSize[0] * 2}px`,
                      height: `${tattooSize[0] * 2}px`,
                      transform: `rotate(${tattooRotation[0]}deg)`,
                      filter: 'brightness(0.9) contrast(1.1)',
                    }}
                  />
                </motion.div>
              )}

              {/* Instructions */}
              {isPreviewActive && !cameraError && (
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm">
                  Click and drag to position your tattoo
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="lg:w-80 space-y-6">
          {/* Quick Actions */}
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold mb-4">Controls</h3>
            <div className="space-y-4">
              <Button
                onClick={capturePhoto}
                disabled={!isPreviewActive || !!cameraError}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
              <Button
                onClick={resetPosition}
                disabled={!isPreviewActive || !!cameraError}
                variant="outline"
                className="w-full border-purple-500/50 hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Position
              </Button>
            </div>
          </Card>

          {/* Adjustment Controls */}
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold mb-4">Adjustments</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Size</label>
                  <span className="text-sm text-muted-foreground">{tattooSize[0]}%</span>
                </div>
                <Slider
                  value={tattooSize}
                  onValueChange={setTattooSize}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                  disabled={!isPreviewActive || !!cameraError}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Rotation</label>
                  <span className="text-sm text-muted-foreground">{tattooRotation[0]}°</span>
                </div>
                <Slider
                  value={tattooRotation}
                  onValueChange={setTattooRotation}
                  max={360}
                  min={0}
                  step={5}
                  className="w-full"
                  disabled={!isPreviewActive || !!cameraError}
                />
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card className="glass-effect p-6">
            <h3 className="text-lg font-semibold mb-4">Tips</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Click and drag to position the tattoo</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Use the sliders to adjust size and rotation</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Capture a photo to save your preview</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}