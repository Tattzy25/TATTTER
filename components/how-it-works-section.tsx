'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain, Palette, Camera, ArrowRight, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: MessageSquare,
      title: 'Share Your Story',
      description: 'Tell us about your life experiences, values, and meaningful moments through our guided questionnaire.',
      details: ['Personal journey questions', 'Values & passions', 'Inspirational memories', 'Future aspirations'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: 2,
      icon: Brain,
      title: 'AI Story Analysis',
      description: 'Our advanced GROQ AI analyzes your responses and creates a detailed, personalized design prompt.',
      details: ['Deep story understanding', 'Symbolic interpretation', 'Style optimization', 'Cultural sensitivity'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: 3,
      icon: Palette,
      title: 'Professional Design Generation',
      description: 'Stability AI Ultra creates stunning, high-resolution tattoo artwork based on your unique story.',
      details: ['4K quality output', 'Professional tattoo format', 'Multiple style options', 'Instant generation'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: 4,
      icon: Camera,
      title: 'AR Preview & Refinement',
      description: 'See your tattoo on your actual skin using augmented reality before making any commitment.',
      details: ['Real-time skin preview', 'Size & position adjustment', 'Photo capture', 'Share with friends'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
            How <span className="gradient-text">Tattty</span> Works
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From your personal story to a meaningful tattoo design in four revolutionary steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl mr-6 shadow-2xl`}>
                    {step.step}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white">{step.title}</h3>
                </div>
                
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + detailIndex * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-white/80">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass-effect p-12 w-96 h-96 flex flex-col items-center justify-center border border-white/20 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-xl shadow-2xl">
                    <div className={`w-32 h-32 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl animate-pulse-glow`}>
                      <step.icon className="w-16 h-16 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Step {step.step}</div>
                      <div className="font-bold text-xl text-white">{step.title}</div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="glass-effect p-12 rounded-3xl border border-purple-500/30 max-w-6xl mx-auto backdrop-blur-xl">
            <h3 className="text-3xl font-black mb-8 gradient-text">The Complete Workflow</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: 'Story Input', desc: 'Deep personal questions', time: '5 minutes' },
                { title: 'AI Processing', desc: 'GROQ analysis + Stability generation', time: '30 seconds' },
                { title: 'Design Output', desc: '4K professional tattoo artwork', time: 'Instant' },
                { title: 'AR Preview', desc: 'Real-time skin visualization', time: 'Live' },
              ].map((item, index) => (
                <div key={item.title} className="text-center">
                  <div className="text-2xl font-black gradient-text mb-2">{item.title}</div>
                  <div className="text-sm text-muted-foreground mb-1">{item.desc}</div>
                  <div className="text-xs text-purple-400 font-semibold">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}