'use client';

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does the AI create personalized tattoo designs?',
      answer: 'Our AI uses advanced natural language processing through GROQ API to analyze your personal stories, values, and experiences. It then creates a detailed prompt that captures the essence of your journey, which is sent to Stability AI to generate a completely unique tattoo design tailored specifically to you.'
    },
    {
      question: 'What makes each tattoo design unique?',
      answer: 'Every design is generated based on your personal responses and can never be replicated. Our AI ensures that no two prompts are identical, and each design reflects your individual story, making it impossible for someone else to have the same tattoo.'
    },
    {
      question: 'How does the AR preview feature work?',
      answer: 'Our augmented reality feature uses your device\'s camera to overlay the generated tattoo design onto your skin in real-time. You can adjust the size, position, and rotation to see exactly how it will look before making any commitment to getting the actual tattoo.'
    },
    {
      question: 'What image quality can I expect?',
      answer: 'Image quality depends on your subscription tier. Starter plans provide 720p resolution, Pro plans offer 1080p HD quality, and Premium plans deliver stunning 4K ultra HD images suitable for professional tattoo artists.'
    },
    {
      question: 'How do tokens work?',
      answer: 'Each tattoo generation uses 1 token from your monthly allowance. Unused tokens roll over to the next month, so you never lose them. You can regenerate designs, try different styles, and create multiple variations within your token limit.'
    },
    {
      question: 'Can I use the designs commercially?',
      answer: 'Personal use is included in all plans. Commercial usage rights are available with Premium subscriptions, allowing you to use the designs for business purposes or sell them to others.'
    },
    {
      question: 'What if I\'m not satisfied with my design?',
      answer: 'You can regenerate designs unlimited times with Pro and Premium plans. We also offer a 30-day money-back guarantee if you\'re not completely satisfied with the service.'
    },
    {
      question: 'Do I need any special equipment for AR preview?',
      answer: 'No special equipment needed! The AR feature works with any modern smartphone or tablet with a camera. Simply point your device at the area where you want the tattoo and see it come to life.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about creating your perfect tattoo with AI
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-6 pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect p-8 rounded-2xl border border-purple-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you create the perfect tattoo design
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@tattty.com"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="px-6 py-3 border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 rounded-lg font-semibold transition-all duration-200"
              >
                Live Chat
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}