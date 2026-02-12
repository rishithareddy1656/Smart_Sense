🧥✨ Smart Wardrobe Stylist

AI-powered personal styling assistant that transforms your wardrobe into a smart fashion advisor.

Smart Wardrobe Stylist is an intelligent web application that helps users upload clothing items, organize their digital wardrobe, and receive smart outfit recommendations based on color harmony, style compatibility, and occasion.

Built using React + TypeScript + Vite + Google Gemini AI, this project combines structured AI reasoning with modern frontend development.

🚀 Features
👕 Digital Wardrobe

Upload clothing images

AI extracts:

Clothing type

Primary color

Fabric

Category (Tops, Bottoms, Dresses, etc.)

Style (Casual, Formal, Business, Party, Sporty)

Items stored locally per user

👗 Smart Outfit Recommendations

Generate intelligent outfit combinations based on:

Occasion

Selected wardrobe item

Color harmony

Style alignment

Category compatibility (Top + Bottom logic)

Each recommendation includes:

Outfit title

Items used

Accessories suggestions

Footwear suggestion

Styling rationale

Shopping suggestions

🛍 Marketplace Pairing

Before buying a new item, get insights on:

“How will this piece pair with your existing wardrobe?”

Encourages smart and sustainable shopping decisions.

🧠 How It Works

User uploads clothing images.

Gemini AI analyzes attributes.

Wardrobe items are structured into formatted context:

ID | Type | Color | Fabric | Category | Style


AI receives strict compatibility rules.

Model generates exactly 3 structured outfit recommendations in JSON format.

UI renders results dynamically.

🏗 Tech Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

AI

Google Gemini 1.5 Pro

Structured JSON output schema

Controlled temperature configuration

Storage

Browser Local Storage (per user)

📂 Project Structure
smart-wardrobe-stylist/
│
├── components/           Reusable UI components
├── pages/                Application pages
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Upload.tsx
│   ├── Recommendations.tsx
│   └── Marketplace.tsx
│
├── services/
│   └── geminiServices.ts
│
├── types.ts
├── App.tsx
├── index.tsx
├── vite.config.ts
└── README.md

⚙️ Installation & Setup
Prerequisites

Node.js (v18+ recommended)

Google Gemini API Key

1️⃣ Clone Repository
git clone https://github.com/your-username/smart-wardrobe-stylist.git
cd smart-wardrobe-stylist

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the root folder:

VITE_GEMINI_API_KEY=your_api_key_here


⚠️ Important:

Do NOT commit .env file

Restart server after adding the key

4️⃣ Run Development Server
npm run dev


Open:

http://localhost:3000

🔐 Environment Variables
Variable	Description
VITE_GEMINI_API_KEY	Google Gemini API Key
