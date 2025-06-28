'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Camera, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartJourney: () => void;
}

export function HeroSection({ onStartJourney }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-purple-500/30 mb-8 backdrop-blur-xl"
          >
            <Star className="w-5 h-5 text-yellow-400 mr-3 animate-pulse" />
            <span className="text-sm font-semibold text-purple-300">Revolutionary AI Tattoo Technology</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight"
          >
            Your Story.{' '}
            <span className="gradient-text animate-gradient neon-glow">
              Your Ink.
            </span>
            <br />
            <span className="text-4xl sm:text-6xl lg:text-7xl text-white/90">
              Perfectly Crafted.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed space-y-4"
          >
            <p className="font-medium text-white/80">
              Advanced AI transforms your deepest stories into breathtaking tattoo art.
            </p>
            <p className="text-lg sm:text-xl text-purple-300 font-semibold">
              See it on your skin with AR before you commit.
            </p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Sparkles, text: 'AI Story Analysis', color: 'from-purple-500 to-pink-500' },
              { icon: Camera, text: 'AR Skin Preview', color: 'from-blue-500 to-cyan-500' },
              { icon: Zap, text: '4K Professional Quality', color: 'from-green-500 to-emerald-500' },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group"
              >
                <div className="flex items-center px-6 py-4 glass-effect rounded-full border border-white/20 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-xl">
                  <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mr-3 group-hover:animate-pulse`}>
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">{feature.text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              onClick={onStartJourney}
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold px-12 py-6 text-xl group shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 rounded-xl"
            >
              Create My Tattoo
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-500/60 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 px-12 py-6 text-xl font-semibold transition-all duration-300 rounded-xl backdrop-blur-xl"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView()}
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-12 border-t border-white/10"
          >
            <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider font-semibold">
              Trusted by creators worldwide
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: '100K+', label: 'Stories Transformed', subtext: 'into permanent art' },
                { number: '99.2%', label: 'Customer Satisfaction', subtext: 'love their designs' },
                { number: '∞', label: 'Unique Creations', subtext: 'never duplicated' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-4xl sm:text-5xl font-black gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-base font-bold text-white mb-2">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.subtext}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}