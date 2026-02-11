
import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Landing Header */}
      <header className="px-8 h-20 flex items-center justify-between border-b border-[#f2f0ea]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#4a4a4a] rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-coat"></i>
          </div>
          <span className="text-xl font-serif font-bold text-[#4a4a4a]">StyleSense</span>
        </div>
        <button onClick={onStart} className="text-sm font-bold uppercase tracking-widest text-[#4a4a4a]">Get Started</button>
      </header>

      <div className="max-w-7xl mx-auto px-8 pt-32 pb-40">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-4 mb-8">
            <span className="px-4 py-1 bg-[#f2f0ea] text-[#8c7e6a] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">🧥 Smart Wardrobe Stylist</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-serif font-bold text-[#2d2d2d] leading-[1.1] mb-10">
            A Generative AI–Powered <br/>
            <span className="italic text-[#8c7e6a]">Personal</span> Assistant.
          </h1>
          <p className="text-xl text-[#7a7a7a] mb-12 max-w-xl leading-relaxed">
            Upload your existing clothes and unlock endless styling possibilities. 
            Smart recommendations for your life, curated by intelligence.
          </p>
          <button 
            onClick={onStart}
            className="px-12 py-5 bg-[#4a4a4a] text-white rounded-2xl font-bold shadow-2xl hover:bg-[#333] hover:-translate-y-1 transition-all"
          >
            Enter Studio
          </button>
        </div>
      </div>
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#faf9f6] -z-10 hidden lg:block"></div>
      <div className="absolute bottom-20 right-20 w-80 h-96 border border-[#e5e1d8] rounded-[60px] -z-10 opacity-50"></div>
    </div>
  );
};

export default Home;
