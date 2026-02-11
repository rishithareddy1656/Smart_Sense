
import React, { useState } from 'react';
import { WardrobeItem, MarketplaceItem } from '../types';
import { getMarketplacePairing } from '../services/geminiService';

interface MarketplaceProps {
  wardrobe: WardrobeItem[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ wardrobe }) => {
  const [pairingAdvice, setPairingAdvice] = useState<string | null>(null);
  const [loadingPairing, setLoadingPairing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  const mockItems: MarketplaceItem[] = [
    { id: 'm1', name: 'Premium Linen Blazer', price: '$189', imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400', category: 'Outerwear' },
    { id: 'm2', name: 'Raw Denim Straight Leg', price: '$120', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400', category: 'Bottoms' },
    { id: 'm3', name: 'Silk Button Down', price: '$145', imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=400', category: 'Tops' },
    { id: 'm4', name: 'Chelsea Leather Boots', price: '$210', imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=400', category: 'Shoes' },
  ];

  const handlePairingRequest = async (item: MarketplaceItem) => {
    setSelectedItem(item);
    setLoadingPairing(true);
    setPairingAdvice(null);
    try {
      const advice = await getMarketplacePairing(item.name, wardrobe);
      setPairingAdvice(advice);
    } catch (err) {
      setPairingAdvice("Could not generate advice at this time.");
    } finally {
      setLoadingPairing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-serif font-bold text-[#2d2d2d] mb-2">Sustainable Marketplace</h2>
        <p className="text-[#9a9a9a] font-medium">Add meaningful pieces that complement your current collection.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {mockItems.map(item => (
            <div key={item.id} className="bg-white rounded-[40px] overflow-hidden border border-[#f2f0ea] hover:shadow-xl transition-all">
              <div className="aspect-[4/5]">
                <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-serif font-bold text-[#2d2d2d]">{item.name}</h4>
                  <span className="font-bold text-[#8c7e6a]">{item.price}</span>
                </div>
                <button 
                  onClick={() => handlePairingRequest(item)}
                  className="w-full py-4 border border-[#e5e1d8] rounded-2xl text-xs font-bold uppercase tracking-widest text-[#4a4a4a] hover:bg-[#faf9f6] transition-all"
                >
                  See How It Pairs
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#faf9f6] rounded-[40px] p-10 border border-[#e5e1d8] sticky top-12">
            <h3 className="text-2xl font-serif font-bold text-[#2d2d2d] mb-6">Stylist Pairing Tool</h3>
            {selectedItem ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img src={selectedItem.imageUrl} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                  <div>
                    <p className="font-bold text-[#4a4a4a]">{selectedItem.name}</p>
                    <p className="text-xs text-[#9a9a9a]">{selectedItem.category}</p>
                  </div>
                </div>
                
                <div className="p-6 bg-white rounded-3xl border border-[#f2f0ea]">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8c7e6a] mb-4">Pairing Potential</h4>
                  {loadingPairing ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-2 bg-[#f2f0ea] rounded w-full"></div>
                      <div className="h-2 bg-[#f2f0ea] rounded w-4/5"></div>
                    </div>
                  ) : (
                    <p className="text-sm text-[#7a7a7a] leading-relaxed italic">"{pairingAdvice}"</p>
                  )}
                </div>
                <button className="w-full py-4 bg-[#4a4a4a] text-white rounded-2xl font-bold shadow-lg">Purchase Item</button>
              </div>
            ) : (
              <div className="text-center py-20 space-y-4">
                <i className="fas fa-magic text-3xl text-[#e5e1d8]"></i>
                <p className="text-sm text-[#9a9a9a] italic">Select an item to see how it fits into your existing wardrobe.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
