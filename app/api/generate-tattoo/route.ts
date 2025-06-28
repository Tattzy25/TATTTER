import { NextRequest, NextResponse } from 'next/server';
import { GroqAPI } from '@/lib/api/groq';
import { StabilityAPI } from '@/lib/api/stability';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting tattoo generation workflow...');
    
    const body = await request.json();
    const { userAnswers } = body;

    if (!userAnswers) {
      return NextResponse.json(
        { error: 'User answers are required' },
        { status: 400 }
      );
    }

    console.log('📋 Processing user story and preferences...');

    // Validate required fields
    const requiredFields = ['life_journey', 'values_passion', 'inspiration_memory', 'future_vision', 'placement', 'size', 'color', 'style'];
    const missingFields = requiredFields.filter(field => !userAnswers[field] || userAnswers[field].trim() === '');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Incomplete user answers',
          details: `Missing: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Initialize APIs
    console.log('🔧 Initializing AI services...');
    const groqAPI = new GroqAPI();
    const stabilityAPI = new StabilityAPI();

    // Step 1: Generate optimized prompt for Stability AI
    console.log('🧠 Step 1: Creating tattoo design prompt...');
    const tattooPrompt = await groqAPI.generateTattooPrompt(userAnswers);
    
    // Step 2: Determine optimal aspect ratio
    const aspectRatio = stabilityAPI.getAspectRatioForPlacement(userAnswers.placement);
    console.log('📐 Step 2: Using aspect ratio:', aspectRatio);
    
    // Step 3: Generate tattoo design
    console.log('🎨 Step 3: Generating tattoo artwork...');
    const imageResponse = await stabilityAPI.generateImage({
      prompt: tattooPrompt,
      aspect_ratio: aspectRatio,
      output_format: 'png',
      seed: Math.floor(Math.random() * 1000000)
    });

    // Step 4: Prepare response
    const imageDataUrl = `data:image/png;base64,${imageResponse.image}`;
    
    console.log('✅ Tattoo generation completed successfully!');

    return NextResponse.json({
      success: true,
      data: {
        imageUrl: imageDataUrl,
        prompt: tattooPrompt,
        seed: imageResponse.seed,
        aspectRatio,
        metadata: {
          placement: userAnswers.placement,
          size: userAnswers.size,
          style: userAnswers.style,
          color: userAnswers.color,
          finishReason: imageResponse.finish_reason
        }
      }
    });

  } catch (error) {
    console.error('💥 Generation error:', error);
    
    let errorMessage = 'Failed to generate tattoo';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('Groq API')) {
        errorMessage = 'Failed to create design prompt';
        statusCode = 502;
      } else if (error.message.includes('Stability')) {
        errorMessage = 'Failed to generate tattoo artwork';
        statusCode = 502;
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: statusCode }
    );
  }
}