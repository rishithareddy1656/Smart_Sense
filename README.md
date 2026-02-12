🧥 Smart Sense: AI-Powered Wardrobe Stylist
Smart Sense is an intelligent personal fashion assistant that transforms your physical closet into a digital, AI-driven wardrobe. By leveraging the power of Google Gemini AI, the application helps users organize their clothing, receive personalized outfit recommendations, and make smarter, more sustainable fashion choices.

✨ Features
👕 Digital Wardrobe Management
AI Auto-Tagging: Upload images of your clothes, and the Gemini AI automatically extracts details like clothing type, primary color, fabric, category, and style.

Visual Catalog: View your entire collection in a structured dashboard, categorized by Tops, Bottoms, Dresses, and more.

Local Persistence: Your wardrobe data is stored locally in your browser for quick access without needing a complex backend.

👗 Smart Outfit Recommendations
Context-Aware Styling: Generate outfit combinations based on specific occasions (Casual, Formal, Party, etc.).

Color & Style Harmony: The AI uses fashion logic to ensure recommended pieces complement each other in both color and silhouette.

Complete Look: Every recommendation includes an outfit title, accessories, footwear suggestions, and the "Styling Rationale" explaining why the look works.

🛍 Marketplace Insight
Sustainable Shopping: Before buying a new item, check how it pairs with your existing wardrobe to avoid impulse buys and ensure versatility.

🛠 Tech Stack
Frontend: React + TypeScript (for type-safe, scalable UI development).

Build Tool: Vite (for lightning-fast development and bundling).

Styling: Tailwind CSS (for a clean, modern, and responsive interface).

AI Engine: Google Gemini 1.5 Pro (handles image analysis and structured JSON recommendation logic).

State Management: React Hooks & Browser Local Storage.

📁 Project Structure
Plaintext
smart-wardrobe-stylist/
├── components/       # Reusable UI elements (Buttons, Cards, Modals)
├── pages/            # Main application views
│   ├── Home.tsx          # Landing page
│   ├── Dashboard.tsx     # Wardrobe overview
│   ├── Upload.tsx        # Image upload & AI analysis
│   ├── Recommendations.tsx # AI outfit generation
│   └── Marketplace.tsx    # Mix-and-match simulator
├── services/         # Logic for API calls (Gemini API integration)
├── types.ts          # TypeScript interfaces for Wardrobe & Outfits
├── App.tsx           # Main application routing
└── vite.config.ts    # Vite configuration
🚀 Getting Started
Follow these steps to get the project running on your local machine.

Prerequisites
Node.js (v18.0.0 or higher)

A Google Gemini API Key (Get one at Google AI Studio)

1. Clone the Repository
Bash
git clone https://github.com/rishithareddy1656/Smart_Sense.git
cd Smart_Sense
2. Install Dependencies
Bash
npm install
3. Setup Environment Variables
Create a .env file in the root directory and add your API key:

Code snippet
VITE_GEMINI_API_KEY=your_gemini_api_key_here
4. Launch the App
Bash
npm run dev
The app will be available at http://localhost:5173.

🧠 How the AI Logic Works
Smart Sense doesn't just "guess" outfits; it uses a structured workflow:

Vision Analysis: When you upload a photo, Gemini 1.5 Pro analyzes the image and returns a structured JSON object containing the garment's attributes.

Constraint-Based Prompting: When asking for recommendations, the app sends your entire digital wardrobe "index" (IDs, Colors, Styles) to the AI.

Structured Output: The AI is instructed to return exactly 3 outfit options in a strict JSON format, which the frontend then parses into beautiful UI cards.
