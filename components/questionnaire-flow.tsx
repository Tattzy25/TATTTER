'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Star, Compass, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface QuestionnaireFlowProps {
  onComplete: (answers: any) => void;
  onBack: () => void;
}

const personalQuestions = [
  {
    id: 'life_journey',
    title: 'Your Life Journey',
    question: 'Tell us about a pivotal moment or experience that shaped who you are today. What journey or transformation have you been through?',
    icon: Compass,
    placeholder: 'Share your story of growth, challenge, or discovery...'
  },
  {
    id: 'values_passion',
    title: 'Values & Passion',
    question: 'What drives you? What are your core values, beliefs, or passions that define your purpose in life?',
    icon: Heart,
    placeholder: 'Describe what matters most to you and what you stand for...'
  },
  {
    id: 'inspiration_memory',
    title: 'Inspiration & Memory',
    question: 'Is there a person, place, or memory that deeply inspires you or that you want to honor and remember forever?',
    icon: Star,
    placeholder: 'Share who or what has left a lasting impact on your soul...'
  },
  {
    id: 'future_vision',
    title: 'Future Vision',
    question: 'Where do you see yourself going? What dreams, aspirations, or legacy do you want to create or be remembered for?',
    icon: Crown,
    placeholder: 'Paint a picture of your future self and aspirations...'
  }
];

const placements = [
  'Forearm', 'Shoulder', 'Back', 'Chest', 'Bicep', 'Thigh', 'Calf', 'Wrist', 'Ankle', 'Ribcage', 'Neck', 'Behind Ear', 'Hip', 'Spine', 'Hand', 'Foot'
];

const sizes = [
  'Tiny (1-2 inches)', 'Small (2-4 inches)', 'Medium (4-6 inches)', 'Large (6-8 inches)', 'Extra Large (8-10 inches)', 'Full Sleeve', 'Half Sleeve', 'Quarter Sleeve', 'Full Back', 'Half Back', 'Chest Panel', 'Thigh Panel', 'Calf Panel', 'Hand Piece', 'Foot Piece'
];

const colors = [
  'Black & Gray', 'Full Color', 'Minimal Color', 'Black with Red Accents', 'Blue Tones', 'Warm Colors', 'Cool Colors', 'Watercolor Style', 'Geometric Colors', 'Muted Colors', 'Vibrant Colors', 'Earth Tones', 'Monochromatic', 'Gradient', 'Neon Colors'
];

const styles = [
  'Realistic', 'Traditional', 'Neo-Traditional', 'Minimalist', 'Geometric', 'Abstract', 'Watercolor', 'Blackwork', 'Fine Line', 'Dotwork', 'Tribal', 'Celtic', 'Japanese', 'Mandala', 'Biomechanical', 'Surrealism'
];

export function QuestionnaireFlow({ onComplete, onBack }: QuestionnaireFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const totalSteps = personalQuestions.length + 4; // 4 personal + 4 style questions
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (key: string, value: string) => {
    console.log(`Setting answer for ${key}:`, value);
    setAnswers(prev => {
      const newAnswers = { ...prev, [key]: value };
      console.log('Updated answers:', newAnswers);
      return newAnswers;
    });
  };

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep);
    console.log('Current answers:', answers);
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      console.log('Moving to step:', currentStep + 1);
    } else {
      console.log('Completing questionnaire with answers:', answers);
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    if (currentStep < personalQuestions.length) {
      // For personal questions, check if there's any text
      const currentQuestion = personalQuestions[currentStep];
      const answer = answers[currentQuestion.id] || '';
      const hasText = answer.trim().length > 0;
      console.log(`Can proceed for ${currentQuestion.id}:`, hasText, 'Answer:', answer);
      return hasText;
    } else {
      // For style questions, check if an option is selected
      const styleKeys = ['placement', 'size', 'color', 'style'];
      const currentKey = styleKeys[currentStep - personalQuestions.length];
      const hasSelection = Boolean(answers[currentKey]);
      console.log(`Can proceed for ${currentKey}:`, hasSelection, 'Answer:', answers[currentKey]);
      return hasSelection;
    }
  };

  const renderPersonalQuestion = (question: typeof personalQuestions[0]) => {
    const currentAnswer = answers[question.id] || '';

    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <question.icon className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold gradient-text">{question.title}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{question.question}</p>
        </div>

        <div className="space-y-4">
          <Label htmlFor={question.id} className="text-lg font-medium">Share your story</Label>
          <Textarea
            id={question.id}
            placeholder={question.placeholder}
            value={currentAnswer}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="glass-effect min-h-[150px] text-lg border-purple-500/20 focus:border-purple-500/50 resize-none"
          />
          <p className="text-sm text-muted-foreground">
            The more detail you share, the more personalized your tattoo will be
          </p>
        </div>
      </motion.div>
    );
  };

  const renderStyleQuestion = (title: string, options: string[], key: string) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold gradient-text">{title}</h2>
        <p className="text-muted-foreground">Choose your preferred {key}</p>
      </div>

      <RadioGroup
        value={answers[key] || ''}
        onValueChange={(value) => handleAnswer(key, value)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {options.map((option) => (
          <motion.div
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Label
              htmlFor={option}
              className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                answers[key] === option
                  ? 'bg-purple-500/20 border-purple-500 border-2'
                  : 'glass-effect hover:bg-white/10 border border-white/10'
              }`}
            >
              <RadioGroupItem value={option} id={option} />
              <span className="text-sm font-medium">{option}</span>
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );

  const getCurrentContent = () => {
    if (currentStep < personalQuestions.length) {
      return renderPersonalQuestion(personalQuestions[currentStep]);
    } else {
      const styleIndex = currentStep - personalQuestions.length;
      const styleQuestions = [
        { title: 'Tattoo Placement', options: placements, key: 'placement' },
        { title: 'Tattoo Size', options: sizes, key: 'size' },
        { title: 'Color Preference', options: colors, key: 'color' },
        { title: 'Art Style', options: styles, key: 'style' }
      ];
      const current = styleQuestions[styleIndex];
      return renderStyleQuestion(current.title, current.options, current.key);
    }
  };

  const isProceedEnabled = canProceed();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen p-4 sm:p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-sm text-muted-foreground">
            {currentStep + 1} of {totalSteps}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="glass-effect p-6 sm:p-8 w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {getCurrentContent()}
          </AnimatePresence>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!isProceedEnabled}
          size="lg"
          className={`font-semibold group transition-all duration-200 ${
            isProceedEnabled 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          {currentStep === totalSteps - 1 ? 'Generate My Tattoo' : 'Continue'}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}