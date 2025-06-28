# Tattty - AI Tattoo Generator with AR Preview

Transform your life story into meaningful tattoo art with AI-powered personalization and AR preview technology.

## 🚀 Features

- **AI-Powered Personalization**: Uses GROQ API to analyze your life story and create unique prompts
- **Professional Image Generation**: Stability AI Ultra generates high-quality tattoo designs
- **AR Preview**: See your tattoo on your skin before you ink it
- **Subscription-Based**: Token system with different quality tiers
- **Mobile-First Design**: Responsive and app-like experience

## 🔧 Setup Instructions

### 1. Environment Variables

Copy the `.env.example` file to `.env` and add your API keys:

```bash
cp .env.example .env
```

Then edit `.env` and add your actual API keys:

```env
# GROQ API Configuration
GROQ_API_KEY=your_actual_groq_api_key_here

# Stability AI Configuration  
STABILITY_API_KEY=your_actual_stability_api_key_here
```

### 2. Get Your API Keys

#### GROQ API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

#### Stability AI API Key
1. Visit [platform.stability.ai](https://platform.stability.ai)
2. Sign up or log in
3. Go to Account → API Keys
4. Create a new API key
5. Copy the key to your `.env` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 🎨 How It Works

1. **Story Collection**: Users answer deep, meaningful questions about their life experiences
2. **AI Prompt Generation**: GROQ API analyzes the story and creates a unique, detailed prompt
3. **Image Generation**: Stability AI Ultra generates a high-quality tattoo design
4. **AR Preview**: Users can preview the tattoo on their skin using AR technology

## 🔑 API Integration

### GROQ API
- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Model**: `llama-3.1-70b-versatile`
- **Purpose**: Analyzes user stories and generates detailed tattoo design prompts

### Stability AI Ultra
- **Endpoint**: `https://api.stability.ai/v2beta/stable-image/generate/ultra`
- **Resolution**: 1 megapixel (1024x1024 default)
- **Credits**: 8 credits per successful generation
- **Purpose**: Generates high-quality tattoo artwork from prompts

## 📱 Features

- **Responsive Design**: Mobile-first approach with app-like experience
- **Real-time Generation**: Live status updates during AI processing
- **Error Handling**: Comprehensive error states with retry functionality
- **Download & Share**: High-resolution downloads and social sharing
- **AR Preview**: Camera-based augmented reality preview

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: shadcn/ui, Radix UI
- **AI APIs**: GROQ (prompt generation), Stability AI (image generation)
- **Icons**: Lucide React

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your GROQ API key for prompt generation | Yes |
| `STABILITY_API_KEY` | Your Stability AI API key for image generation | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's URL (for sharing features) | No |

## 🚀 Deployment

The app is configured for static export and can be deployed to any static hosting service:

```bash
npm run build
```

This creates an optimized production build in the `out` directory.

## 📄 License

This project is private and proprietary.