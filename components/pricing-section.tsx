'use client';

import { motion } from 'framer-motion';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingSectionProps {
  onSelectPlan: () => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$9.99',
      period: '/month',
      tokens: 25,
      resolution: '720p',
      features: [
        '25 AI generations per month',
        '720p image quality',
        'Basic AR preview',
        'Standard support',
        'Save & share designs',
        'Basic customization options'
      ],
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      buttonText: 'Start Creating'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: '/month',
      tokens: 75,
      resolution: '1080p',
      features: [
        '75 AI generations per month',
        '1080p HD image quality',
        'Advanced AR preview',
        'Priority support',
        'High-resolution downloads',
        'Custom style training',
        'Unlimited regenerations',
        'Professional stencils'
      ],
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      buttonText: 'Go Pro'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$39.99',
      period: '/month',
      tokens: 200,
      resolution: '4K',
      features: [
        '200 AI generations per month',
        '4K ultra HD image quality',
        'Professional AR preview',
        '24/7 premium support',
        'Commercial usage rights',
        'Bulk generation tools',
        'API access',
        'Custom AI model training',
        'Priority processing',
        'Tattoo artist network access'
      ],
      icon: Star,
      color: 'from-amber-500 to-orange-500',
      buttonText: 'Go Premium'
    }
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Creative Power</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible token-based pricing that grows with your creativity. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 z-10">
                  Most Popular
                </Badge>
              )}
              
              <Card className={`glass-effect p-8 h-full relative overflow-hidden ${
                plan.popular ? 'border-purple-500/50 glow-effect' : 'border-white/10'
              }`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5`}></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  {/* Token Info */}
                  <div className="text-center mb-8 p-4 glass-effect rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{plan.tokens}</div>
                    <div className="text-sm text-muted-foreground">Tokens per month</div>
                    <div className="text-xs text-muted-foreground mt-1">Up to {plan.resolution} quality</div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={onSelectPlan}
                    className={`w-full font-semibold py-3 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center space-y-6"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              No hidden fees
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Secure payments
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              30-day money back
            </div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">How Tokens Work</h3>
            <p className="text-sm text-muted-foreground">
              Each tattoo generation uses 1 token. Unused tokens roll over to the next month. 
              Higher tiers get better image quality and more features.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}