import React, { useState } from 'react';
import { WardrobeItem, OutfitRecommendation } from '../types';
import { generateOutfitRecommendations } from '../services/geminiService';

interface RecommendationsProps {
  wardrobe: WardrobeItem[];
  onNavigate: (page: string) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ wardrobe }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outfits, setOutfits] = useState<OutfitRecommendation[]>([]);

  const handleGenerate = async (context: string) => {
    if (!context || context.trim() === '') {
      alert("Please describe the occasion.");
      return;
    }

    if (wardrobe.length < 2) {
      alert("Please upload at least 2 pieces to start styling.");
      return;
    }

    try {
      setIsGenerating(true);
      setOutfits([]);

      const result = await generateOutfitRecommendations(wardrobe, context);

      if (!result || !Array.isArray(result) || result.length === 0) {
        alert("No outfits generated. Try a simpler request.");
        return;
      }

      setOutfits(result);

    } catch (error: any) {
      console.error("Recommendation Error:", error);
      alert(error?.message || "Failed to curate. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const occasionTags = [
    "Casual College",
    "Wedding Guest",
    "Brunch with Friends",
    "Corporate Office",
    "Night Party",
    "Travel Gear"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-serif font-bold text-[#2d2d2d] mb-4 text-center">
          Styling Studio
        </h2>

        <p className="text-[#7a7a7a] text-center max-w-xl mx-auto mb-10">
          Describe your day or choose a standard occasion below for AI-powered curations.
        </p>

        <div className="relative max-w-2xl mx-auto mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell me what you're dressing for..."
            className="w-full p-8 bg-white border border-[#e5e1d8] rounded-[40px] shadow-sm outline-none focus:ring-2 focus:ring-[#8c7e6a]/20 min-h-[160px] text-lg font-serif italic"
          />

          <button
            onClick={() => handleGenerate(prompt)}
            disabled={isGenerating}
            className="absolute bottom-6 right-6 w-14 h-14 bg-[#4a4a4a] text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform disabled:opacity-50"
          >
            <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-arrow-right'}`}></i>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {occasionTags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setPrompt(tag);
                handleGenerate(tag);
              }}
              className="px-6 py-2 bg-white border border-[#e5e1d8] rounded-full text-xs font-bold uppercase tracking-widest text-[#7a7a7a] hover:border-[#8c7e6a] hover:text-[#8c7e6a] transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {isGenerating && (
        <div className="py-20 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#e5e1d8] border-t-[#8c7e6a] rounded-full animate-spin mx-auto"></div>
          <p className="font-serif italic text-[#8c7e6a]">
            Generating your styled looks...
          </p>
        </div>
      )}

      {!isGenerating && outfits.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {outfits.map((outfit) => (
            <div
              key={outfit.id}
              className="bg-white rounded-[40px] p-8 shadow-sm border border-[#f2f0ea]"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c7e6a] mb-2 block">
                {outfit.occasion}
              </span>

              <h3 className="text-2xl font-serif font-bold text-[#2d2d2d] mb-6">
                {outfit.title}
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {outfit.itemsUsed.map(id => {
                  const item = wardrobe.find(w => w.id === id);
                  return item ? (
                    <div key={id} className="aspect-square rounded-2xl overflow-hidden border">
                      <img
                        src={item.imageUrl}
                        className="w-full h-full object-cover"
                        alt={item.type}
                      />
                    </div>
                  ) : null;
                })}
              </div>

              <p className="text-sm text-[#7a7a7a] italic mb-4">
                "{outfit.rationale}"
              </p>

              {outfit.shoppingSuggestions?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#9a9a9a] mb-2">
                    Shopping Suggestions
                  </h4>
                  <ul className="list-disc list-inside text-sm text-[#7a7a7a]">
                    {outfit.shoppingSuggestions.map((item, index) => (
                      <li key={index}>
                        {item.item} — {item.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
