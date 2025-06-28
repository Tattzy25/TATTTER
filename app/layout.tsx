import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tattty - AI Tattoo Generator with AR Preview',
  description: 'Create personalized tattoos with AI based on your life story and preview them with AR technology',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  keywords: 'AI tattoo generator, AR tattoo preview, personalized tattoos, tattoo design, artificial intelligence',
  openGraph: {
    title: 'Tattty - AI Tattoo Generator',
    description: 'Transform your life story into meaningful tattoo art with AI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}