'use client';

import { motion } from 'framer-motion';
import { X, Crown, Zap, Star, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
      'Save & share designs'
    ],
    icon: Zap,
    color: 'from-blue-500 to-cyan-500'
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
      'Custom style training'
    ],
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
    popular: true
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
      'API access'
    ],
    icon: Star,
    color: 'from-amber-500 to-orange-500'
  }
];

export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const handleSelectPlan = (planId: string) => {
    // In a real app, this would handle payment processing
    console.log('Selected plan:', planId);
    onOpenChange(false);
    // Here you would integrate with Stripe or another payment processor
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-purple-500/20 max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text text-center">
            Choose Your Creative Power
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Unlock unlimited creativity with our token-based subscription plans
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Most Popular
                </Badge>
              )}
              <Card className={`glass-effect p-6 h-full ${plan.popular ? 'border-purple-500/50' : 'border-white/10'}`}>
                <div className="text-center space-y-4">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tokens:</span>
                      <span className="font-semibold">{plan.tokens}/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quality:</span>
                      <span className="font-semibold">{plan.resolution}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            All plans include secure payment processing and can be cancelled anytime
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}