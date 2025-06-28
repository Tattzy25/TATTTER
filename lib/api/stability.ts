export interface StabilityImageRequest {
  prompt: string;
  aspect_ratio?: '16:9' | '1:1' | '21:9' | '2:3' | '3:2' | '4:5' | '5:4' | '9:16' | '9:21';
  seed?: number;
  output_format?: 'webp' | 'jpeg' | 'png';
  negative_prompt?: string;
}

export interface StabilityImageResponse {
  image: string;
  seed: number;
  finish_reason: string;
}

export class StabilityAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.STABILITY_API_KEY || '';
    this.baseUrl = 'https://api.stability.ai/v2beta/stable-image/generate/ultra';
    
    console.log('🔧 StabilityAPI constructor - Using provided API key');
    
    if (!this.apiKey) {
      throw new Error('STABILITY_API_KEY environment variable is not set');
    }
  }

  async generateImage(request: StabilityImageRequest): Promise<StabilityImageResponse> {
    try {
      console.log('🎨 Generating tattoo design with Stability AI Ultra...');
      console.log('📝 Using prompt length:', request.prompt.length);

      const formData = new FormData();
      formData.append('prompt', request.prompt);
      
      if (request.aspect_ratio) {
        formData.append('aspect_ratio', request.aspect_ratio);
      }
      
      if (request.seed && request.seed > 0) {
        formData.append('seed', request.seed.toString());
      }
      
      formData.append('output_format', request.output_format || 'png');
      
      // Comprehensive negative prompt to ensure clean tattoo designs
      const negativePrompt = 'photograph, photo, realistic person, human skin, existing tattoo, tattoo on person, body, flesh, realistic human, portrait, photography, camera, selfie, people, faces, hands, arms, legs, torso, background clutter, text, watermark, signature, blurry, low quality, distorted, deformed, nsfw, nude, sexual';
      formData.append('negative_prompt', negativePrompt);

      console.log('📡 Sending request to Stability AI...');

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      console.log('📡 Stability API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Stability API Error:', errorText);
        throw new Error(`Stability AI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.image) {
        throw new Error('No image data received from Stability AI');
      }

      console.log('✅ Tattoo design generated successfully');
      
      return {
        image: data.image,
        seed: data.seed || 0,
        finish_reason: data.finish_reason || 'SUCCESS'
      };
    } catch (error) {
      console.error('💥 Stability AI error:', error);
      throw error;
    }
  }

  getAspectRatioForPlacement(placement: string): '16:9' | '1:1' | '21:9' | '2:3' | '3:2' | '4:5' | '5:4' | '9:16' | '9:21' {
    if (!placement) return '1:1';

    const placementLower = placement.toLowerCase();
    
    // Vertical placements
    if (placementLower.includes('forearm') || placementLower.includes('calf') || placementLower.includes('spine')) {
      return '2:3';
    }
    
    // Horizontal placements
    if (placementLower.includes('shoulder') || placementLower.includes('chest') || placementLower.includes('back')) {
      return '3:2';
    }
    
    // Small/square placements
    if (placementLower.includes('wrist') || placementLower.includes('ankle') || placementLower.includes('hand') || placementLower.includes('foot')) {
      return '1:1';
    }
    
    // Sleeve placements
    if (placementLower.includes('full sleeve')) {
      return '9:16';
    }
    
    if (placementLower.includes('half sleeve') || placementLower.includes('quarter sleeve')) {
      return '2:3';
    }
    
    // Larger areas
    if (placementLower.includes('thigh') || placementLower.includes('ribcage') || placementLower.includes('hip')) {
      return '4:5';
    }
    
    return '1:1';
  }
}