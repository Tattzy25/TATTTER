'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Camera, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomeScreenProps {
  onStartJourney: () => void;
  onShowSubscription: () => void;
}

export function WelcomeScreen({ onStartJourney, onShowSubscription }: WelcomeScreenProps) {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Design',
      description: 'Personalized tattoos based on your life story'
    },
    {
      icon: Camera,
      title: 'AR Preview',
      description: 'See your tattoo on your skin before you ink'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Create unique designs in seconds'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen p-4 sm:p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl sm:text-6xl font-bold gradient-text">
            Tattty
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your life story into meaningful tattoo art with AI and preview it with AR
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto w-full"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Card className="glass-effect p-6 h-full hover:glow-effect transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:animate-pulse-glow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex-1 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto w-full"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text">
            Ready to Create Your Story?
          </h2>
          <p className="text-muted-foreground">
            Answer a few questions about your life and watch AI create a tattoo that's uniquely yours
          </p>
        </div>

        <div className="space-y-4 w-full">
          <Button
            onClick={onStartJourney}
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-lg group"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={onShowSubscription}
            variant="outline"
            size="lg"
            className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10 py-4 text-lg group"
          >
            <Crown className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            View Subscription Plans
          </Button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Premium Quality
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            AR Preview
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Unique Designs
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}