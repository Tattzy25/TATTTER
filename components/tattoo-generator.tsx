'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, RotateCcw, Camera, Loader2, Sparkles, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface TattooGeneratorProps {
  userAnswers: any;
  onTattooGenerated: (imageUrl: string) => void;
  onARPreview: () => void;
  onBack: () => void;
}

interface GenerationResponse {
  success: boolean;
  data?: {
    imageUrl: string;
    prompt: string;
    seed: number;
    aspectRatio: string;
    metadata: {
      placement: string;
      size: string;
      style: string;
      color: string;
    };
  };
  error?: string;
  details?: string;
}

export function TattooGenerator({ userAnswers, onTattooGenerated, onARPreview, onBack }: TattooGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generationData, setGenerationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState<string>('');

  useEffect(() => {
    generateTattoo();
  }, []);

  const generateTattoo = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationStep('Analyzing your story...');
    
    try {
      const response = await fetch('/api/generate-tattoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAnswers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      setGenerationStep('Creating your design...');
      
      const result: GenerationResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to generate tattoo');
      }

      const { imageUrl, prompt: generatedPrompt, ...metadata } = result.data;
      
      setGeneratedImage(imageUrl);
      setPrompt(generatedPrompt);
      setGenerationData(metadata);
      onTattooGenerated(imageUrl);
      
      toast.success('Your unique tattoo has been created!', {
        description: 'Ready for AR preview and download'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Generation failed: ${errorMessage}`);
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleRegenerate = async () => {
    await generateTattoo();
    toast.info('Creating a new interpretation of your story...');
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `tattty-design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('High-resolution design downloaded!');
    }
  };

  const handleShare = async () => {
    if (navigator.share && generatedImage) {
      try {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const file = new File([blob], 'my-tattoo-design.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'My AI Generated Tattoo Design',
          text: 'Check out my personalized tattoo design created with Tattty AI!',
          files: [file]
        });
      } catch (error) {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-black gradient-text">Your Tattoo Design</h1>
        <div className="w-20"></div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        {/* Generated Image */}
        <div className="flex-1 flex items-center justify-center">
          <Card className="glass-effect p-6 w-full max-w-2xl backdrop-blur-xl border border-white/20">
            <div className="aspect-square relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-black gradient-text">Creating Your Masterpiece</p>
                    <p className="text-lg text-white/80 font-semibold">{generationStep}</p>
                    <div className="flex items-center justify-center space-x-3 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>This may take 30-60 seconds</span>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 p-8">
                  <AlertCircle className="w-20 h-20 text-red-400" />
                  <div className="text-center space-y-4">
                    <p className="text-xl font-bold text-red-400">Generation Failed</p>
                    <p className="text-sm text-muted-foreground max-w-md">{error}</p>
                    <Button
                      onClick={handleRegenerate}
                      variant="outline"
                      className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : generatedImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-full"
                >
                  <img
                    src={generatedImage}
                    alt="Your Generated Tattoo Design"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-4 left-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg backdrop-blur-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">Design Complete</span>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">No design generated yet</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Actions & Info */}
        <div className="lg:w-96 space-y-6">
          {/* Quick Actions */}
          <Card className="glass-effect p-6 backdrop-blur-xl border border-white/20">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleRegenerate}
                disabled={isGenerating}
                variant="outline"
                className="border-purple-500/50 hover:bg-purple-500/20 text-purple-300 font-semibold"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RotateCcw className="w-4 h-4 mr-2" />
                )}
                Regenerate
              </Button>
              <Button
                onClick={onARPreview}
                disabled={!generatedImage}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
              >
                <Camera className="w-4 h-4 mr-2" />
                AR Preview
              </Button>
              <Button
                onClick={handleDownload}
                disabled={!generatedImage}
                variant="outline"
                className="border-green-500/50 hover:bg-green-500/20 text-green-400 font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                disabled={!generatedImage}
                variant="outline"
                className="border-blue-500/50 hover:bg-blue-500/20 text-blue-400 font-semibold"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </Card>

          {/* Design Details */}
          <Card className="glass-effect p-6 backdrop-blur-xl border border-white/20">
            <h3 className="text-xl font-bold mb-6">Design Specifications</h3>
            <div className="space-y-4">
              {[
                { label: 'Placement', value: userAnswers.placement },
                { label: 'Size', value: userAnswers.size },
                { label: 'Style', value: userAnswers.style },
                { label: 'Colors', value: userAnswers.color },
                ...(generationData?.aspectRatio ? [{ label: 'Aspect Ratio', value: generationData.aspectRatio }] : [])
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                  <span className="text-muted-foreground font-medium">{item.label}:</span>
                  <span className="font-semibold text-white text-right max-w-[60%]">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Inspiration */}
          {prompt && (
            <Card className="glass-effect p-6 backdrop-blur-xl border border-white/20">
              <h3 className="text-xl font-bold mb-4">AI Design Inspiration</h3>
              <div className="text-sm text-muted-foreground bg-black/20 p-4 rounded-lg max-h-40 overflow-y-auto border border-white/10">
                {prompt.length > 200 ? `${prompt.substring(0, 200)}...` : prompt}
              </div>
              {prompt.length > 200 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 text-xs text-purple-400 hover:text-purple-300"
                  onClick={() => {
                    navigator.clipboard.writeText(prompt);
                    toast.success('Full prompt copied to clipboard!');
                  }}
                >
                  Copy Full Prompt
                </Button>
              )}
            </Card>
          )}

          {/* Next Steps */}
          <Card className="glass-effect p-6 backdrop-blur-xl border border-purple-500/30">
            <h3 className="text-xl font-bold mb-4 gradient-text">Next Steps</h3>
            <div className="space-y-4">
              {[
                { icon: Camera, text: 'Use AR Preview to see how it looks on your skin', color: 'text-blue-400' },
                { icon: Download, text: 'Download the high-resolution image for your tattoo artist', color: 'text-green-400' },
                { icon: RotateCcw, text: 'Regenerate if you want to explore different interpretations', color: 'text-purple-400' },
              ].map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <step.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${step.color}`} />
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}