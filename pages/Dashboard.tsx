
import React, { useState } from 'react';
import { WardrobeItem, Category } from '../types';

interface DashboardProps {
  wardrobe: WardrobeItem[];
  onRemoveItem: (id: string) => void;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ wardrobe, onRemoveItem, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const filteredWardrobe = wardrobe.filter(item => {
    const matchesSearch = item.type.toLowerCase().includes(searchTerm.toLowerCase()) || item.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-16">
        <div>
          <h2 className="text-4xl font-serif font-bold text-[#2d2d2d] mb-2">Your Wardrobe</h2>
          <p className="text-[#9a9a9a] font-medium">Managing {wardrobe.length} items in your digital closet</p>
        </div>
        <button 
          onClick={() => onNavigate('upload')}
          className="flex items-center space-x-3 px-6 py-3 bg-[#4a4a4a] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <i className="fas fa-plus"></i>
          <span>Add New Item</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <div className="flex-1 relative">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-[#9a9a9a]"></i>
          <input 
            type="text" 
            placeholder="Search by color or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-[#e5e1d8] rounded-3xl outline-none focus:ring-2 focus:ring-[#8c7e6a]/20 transition-all text-sm shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-4 rounded-3xl text-xs font-bold uppercase tracking-widest transition-all border ${
                filter === cat 
                  ? 'bg-[#4a4a4a] text-white border-[#4a4a4a]' 
                  : 'bg-white text-[#7a7a7a] border-[#e5e1d8] hover:border-[#8c7e6a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredWardrobe.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredWardrobe.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-[40px] p-6 border border-[#f2f0ea] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-6">
                <img 
                  src={item.imageUrl} 
                  alt={item.type} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-400 hover:text-red-600 shadow-md"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-serif font-bold text-[#2d2d2d] truncate">{item.type}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c7e6a] mt-1">{item.style}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#9a9a9a] font-medium uppercase tracking-wider">
                  <span className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color.toLowerCase() }}></span>
                    {item.color}
                  </span>
                  <span>•</span>
                  <span>{item.fabric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 border border-[#e5e1d8]">
            <i className="fas fa-search text-3xl text-[#e5e1d8]"></i>
          </div>
          <p className="text-[#7a7a7a] font-serif italic text-xl">No items found matching your filter.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
