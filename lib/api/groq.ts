export interface GroqChatRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface GroqChatResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class GroqAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || '';
    this.baseUrl = 'https://api.groq.com/openai/v1/chat/completions';
    
    console.log('🔧 GroqAPI constructor - Using provided API key');
    
    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }
  }

  async generateTattooPrompt(userAnswers: any): Promise<string> {
    try {
      console.log('🧠 Generating tattoo design prompt with GROQ...');

      const systemPrompt = `You are an expert tattoo design prompt engineer. Your job is to create detailed prompts for Stability AI that will generate professional tattoo artwork designs.

CRITICAL REQUIREMENTS FOR STABILITY AI:
- Generate TATTOO ARTWORK DESIGNS, not photos of tattoos on people
- Output should be clean tattoo line art/design on white background
- Focus on symbolic, artistic representations
- Include specific artistic style directions
- Ensure designs are suitable for actual tattooing

PROMPT STRUCTURE FOR STABILITY AI:
1. Start with "Professional tattoo design artwork"
2. Describe the symbolic elements based on the user's story
3. Specify the artistic style (${userAnswers.style})
4. Include color specifications (${userAnswers.color})
5. Add technical details for tattoo quality
6. End with "clean line art, white background, tattoo stencil ready"

AVOID IN PROMPTS:
- "photo", "photograph", "realistic person", "human skin"
- "tattoo on person", "body", "flesh", "arms", "legs"
- Any references to existing tattoos or people with tattoos

CREATE SYMBOLIC REPRESENTATIONS:
- Transform personal stories into visual metaphors
- Use nature, geometric, abstract elements
- Focus on meaningful symbols that represent their journey`;

      const userPrompt = `Create a Stability AI prompt for a tattoo design based on this person's story:

PERSONAL STORY:
Life Journey: ${userAnswers.life_journey}
Values & Passion: ${userAnswers.values_passion}
Inspiration & Memory: ${userAnswers.inspiration_memory}
Future Vision: ${userAnswers.future_vision}

DESIGN SPECIFICATIONS:
Placement: ${userAnswers.placement}
Size: ${userAnswers.size}
Color: ${userAnswers.color}
Style: ${userAnswers.style}

Generate a detailed Stability AI prompt that will create a professional tattoo design artwork. The prompt should:
1. Start with "Professional tattoo design artwork"
2. Transform their story into symbolic visual elements
3. Specify ${userAnswers.style} artistic style
4. Include ${userAnswers.color} color scheme
5. Be optimized for ${userAnswers.placement} placement
6. End with "clean line art, white background, tattoo stencil ready"

Make this a complete, detailed prompt that Stability AI can use to generate a beautiful tattoo design.`;

      const request: GroqChatRequest = {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama-3.1-70b-versatile',
        temperature: 0.8,
        max_tokens: 1000
      };

      console.log('📡 Sending request to GROQ API...');

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ GROQ API Error:', errorText);
        throw new Error(`Groq API error: ${response.status} - ${errorText}`);
      }

      const data: GroqChatResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from Groq API');
      }

      const generatedPrompt = data.choices[0].message.content;
      console.log('✅ Tattoo prompt generated successfully');
      console.log('📝 Prompt preview:', generatedPrompt.substring(0, 200) + '...');

      return generatedPrompt;
    } catch (error) {
      console.error('💥 Groq API error:', error);
      throw error;
    }
  }
}