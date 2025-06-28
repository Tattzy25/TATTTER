'use client';

import { motion } from 'framer-motion';
import { Brain, Camera, Palette, Shield, Zap, Users, Star, Crown, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Story Analysis',
      description: 'Our GROQ-powered AI deeply understands your personal narrative and transforms it into symbolic visual elements.',
      color: 'from-purple-500 to-pink-500',
      highlight: 'GROQ AI'
    },
    {
      icon: Camera,
      title: 'Professional AR Preview',
      description: 'See your tattoo on your actual skin with our cutting-edge augmented reality technology.',
      color: 'from-blue-500 to-cyan-500',
      highlight: 'AR Technology'
    },
    {
      icon: Palette,
      title: 'Ultra HD Generation',
      description: 'Stability AI Ultra creates stunning 4K tattoo designs ready for professional artists.',
      color: 'from-green-500 to-emerald-500',
      highlight: '4K Quality'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get your personalized design in under 30 seconds with our optimized AI pipeline.',
      color: 'from-yellow-500 to-orange-500',
      highlight: '30 Seconds'
    },
    {
      icon: Shield,
      title: 'Completely Unique',
      description: 'Every design is 100% original and can never be replicated. Your story, your exclusive art.',
      color: 'from-red-500 to-pink-500',
      highlight: '100% Original'
    },
    {
      icon: Users,
      title: 'Artist Network',
      description: 'Connect with verified tattoo artists in your area who specialize in your chosen style.',
      color: 'from-indigo-500 to-purple-500',
      highlight: 'Pro Network'
    }
  ];

  const stats = [
    { icon: Star, number: '4.9/5', label: 'User Rating', subtext: 'from 50K+ reviews' },
    { icon: Crown, number: '99.2%', label: 'Satisfaction', subtext: 'love their designs' },
    { icon: Sparkles, number: '100K+', label: 'Designs Created', subtext: 'and counting' },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
            Revolutionary Features for{' '}
            <span className="gradient-text">Perfect Tattoos</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience the most advanced tattoo generation platform with cutting-edge AI technology
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Card className="glass-effect p-8 h-full hover:glow-effect transition-all duration-500 border border-white/10 hover:border-purple-500/50 backdrop-blur-xl relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:animate-pulse-glow shadow-2xl`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs font-bold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                      {feature.highlight}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-12 rounded-3xl border border-purple-500/30 backdrop-blur-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black mb-4 gradient-text">Trusted by Creators Worldwide</h3>
            <p className="text-muted-foreground text-lg">Join the revolution in personalized tattoo art</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 group-hover:animate-pulse">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-black gradient-text group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                </div>
                <div className="text-lg font-bold text-white mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.subtext}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}