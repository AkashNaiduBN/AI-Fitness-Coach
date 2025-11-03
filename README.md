# AI Fitness Coach

An intelligent fitness planner built with **Next.js**, **OpenAI**, and **ElevenLabs**, designed to generate **personalized workout and diet plans** with **AI-powered voice narration** and **image generation**.

---

## Features

Generate **personalized workout plans** based on user inputs (name, goal, fitness level, etc.)  
Create **custom diet plans** with calorie and macro breakdown  
Get **AI Tips** for consistency, recovery, and motivation  
**Text-to-Speech (TTS)**: Reads the entire plan using ElevenLabs  
**AI Image Generation**: Visualize your fitness plan with OpenAI’s image models  
Built with a clean, responsive **Next.js frontend**  
Fully modular API routes for `generate-plan`, `tts`, and `image`

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js (React 18) |
| **Styling** | Tailwind CSS |
| **AI APIs** | OpenAI (ChatGPT + DALL·E) |
| **TTS Engine** | ElevenLabs API |
| **Language** | JavaScript (ES6+) |
| **Hosting (optional)** | Vercel / Netlify |

---

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/AkashNaiduBN/AI-Fitness-Coach.git
cd AI-Fitness-Coach

Install Dependencies
npm install

Configure Environment Variables
Create a file named .env.local in the root directory and add your API keys:
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key

Run the App in Development
npm run dev