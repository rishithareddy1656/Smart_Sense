
import { GoogleGenAI, Type } from "@google/genai";
import { WardrobeItem, OutfitRecommendation, Category, Style } from "../types";

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeClothingImage = async (base64Image: string): Promise<Partial<WardrobeItem>> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Analyze this clothing item image strictly. 
  Return a valid JSON object with the following fields:
  - type: Specific clothing item name (e.g., "Denim Jacket", "Silk Saree", "Cotton T-Shirt").
  - color: Primary color.
  - fabric: Visible fabric texture.
  - category: One of ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'].
  - style: One of ['Casual', 'Formal', 'Party', 'Business', 'Sporty'].`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            color: { type: Type.STRING },
            fabric: { type: Type.STRING },
            category: { 
              type: Type.STRING, 
              enum: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'] 
            },
            style: { 
              type: Type.STRING, 
              enum: ['Casual', 'Formal', 'Party', 'Business', 'Sporty'] 
            }
          },
          required: ['type', 'color', 'fabric', 'category', 'style']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return {};
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const generateOutfitRecommendations = async (
  wardrobe: WardrobeItem[], 
  context: string,
  selectedItemId?: string
): Promise<OutfitRecommendation[]> => {
  // Using Gemini 3 Pro for high-quality reasoning
  const model = 'gemini-3-pro-preview';

  const wardrobeContext = wardrobe.map(item => 
    `- [ID: ${item.id}] ${item.type} (${item.category}, ${item.color}, ${item.fabric}, Style: ${item.style})`
  ).join('\n');

  const selectedItem = selectedItemId ? wardrobe.find(i => i.id === selectedItemId) : null;

  const prompt = `You are an elite fashion stylist using the user's digital wardrobe.
  
  USER WARDROBE:
  ${wardrobeContext}

  OCCASION/REQUEST: ${context}
  ${selectedItem ? `REQUIREMENT: The outfit MUST include the item "${selectedItem.type}" (ID: ${selectedItem.id}).` : ''}

  STRICT STYLING RULES:
  1. DO NOT mix traditional ethnic wear (e.g., Lehenga, Saree, Sherwani, Kurta) with casual western bottoms (e.g., Jeans, Shorts, Joggers) unless it is a specific "Indo-Western Fusion" request.
  2. If the user has a Lehenga/Saree, do not pair it with a t-shirt.
  3. Ensure formal tops go with formal bottoms.
  4. If the wardrobe lacks a matching bottom/top, DO NOT force a bad match. Instead, use the 'shoppingSuggestions' field to suggest the missing piece.
  5. Return exactly 3 outfit options.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            outfits: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  occasion: { type: Type.STRING },
                  itemsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
                  suggestedAccessories: { type: Type.ARRAY, items: { type: Type.STRING } },
                  suggestedFootwear: { type: Type.STRING },
                  rationale: { type: Type.STRING },
                  shoppingSuggestions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        item: { type: Type.STRING },
                        reason: { type: Type.STRING }
                      },
                      required: ['item', 'reason']
                    }
                  }
                },
                required: ['id', 'title', 'occasion', 'itemsUsed', 'rationale', 'shoppingSuggestions']
              }
            }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.outfits || [];
    }
    return [];
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const getMarketplacePairing = async (marketplaceItem: string, wardrobe: WardrobeItem[]): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  
  // Summarize wardrobe to keep context small
  const wardrobeSummary = wardrobe.map(i => `${i.color} ${i.type}`).slice(0, 15).join(', ');
  
  const prompt = `I am considering buying: "${marketplaceItem}".
  My current wardrobe includes: ${wardrobeSummary}.
  
  Briefly explain (in 2 sentences) how this new item pairs with my existing clothes. 
  Focus on color versatility and style matching. If it doesn't match well, say so politely.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    return response.text || "Could not generate advice.";
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
