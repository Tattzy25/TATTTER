'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { PricingSection } from '@/components/pricing-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';
import { QuestionnaireFlow } from '@/components/questionnaire-flow';
import { TattooGenerator } from '@/components/tattoo-generator';
import { ARPreview } from '@/components/ar-preview';
import { SubscriptionModal } from '@/components/subscription-modal';

type AppFlow = 'landing' | 'questionnaire' | 'generator' | 'ar-preview';

export default function Home() {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>('landing');
  const [userAnswers, setUserAnswers] = useState<any>(null);
  const [generatedTattoo, setGeneratedTattoo] = useState<string | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);

  const handleStartJourney = () => {
    setCurrentFlow('questionnaire');
  };

  const handleQuestionnaireComplete = (answers: any) => {
    setUserAnswers(answers);
    setCurrentFlow('generator');
  };

  const handleTattooGenerated = (imageUrl: string) => {
    setGeneratedTattoo(imageUrl);
  };

  const handleARPreview = () => {
    if (generatedTattoo) {
      setCurrentFlow('ar-preview');
    }
  };

  const handleBackToLanding = () => {
    setCurrentFlow('landing');
  };

  const handleShowSubscription = () => {
    setShowSubscription(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements - Lower z-index */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900 -z-10"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 -z-10"></div>
      
      {/* Floating Elements - Lower z-index */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500 rounded-full animate-float opacity-60 -z-10"></div>
      <div className="absolute top-40 right-16 w-6 h-6 bg-blue-500 rounded-full animate-float opacity-40 -z-10" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-20 w-5 h-5 bg-pink-500 rounded-full animate-float opacity-50 -z-10" style={{ animationDelay: '2s' }}></div>

      <AnimatePresence mode="wait">
        {currentFlow === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <Header onStartJourney={handleStartJourney} onShowPricing={() => document.getElementById('pricing')?.scrollIntoView()} />
            <HeroSection onStartJourney={handleStartJourney} />
            <FeaturesSection />
            <HowItWorksSection />
            <PricingSection onSelectPlan={handleShowSubscription} />
            <TestimonialsSection />
            <FAQSection />
            <Footer />
          </motion.div>
        )}
        
        {currentFlow === 'questionnaire' && (
          <QuestionnaireFlow
            key="questionnaire"
            onComplete={handleQuestionnaireComplete}
            onBack={handleBackToLanding}
          />
        )}
        
        {currentFlow === 'generator' && (
          <TattooGenerator
            key="generator"
            userAnswers={userAnswers}
            onTattooGenerated={handleTattooGenerated}
            onARPreview={handleARPreview}
            onBack={() => setCurrentFlow('questionnaire')}
          />
        )}
        
        {currentFlow === 'ar-preview' && generatedTattoo && (
          <ARPreview
            key="ar-preview"
            tattooImage={generatedTattoo}
            onBack={() => setCurrentFlow('generator')}
          />
        )}
      </AnimatePresence>

      <SubscriptionModal 
        open={showSubscription}
        onOpenChange={setShowSubscription}
      />
    </div>
  );
}