
import React from 'react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  language: string;
  onSetLanguage: (lang: 'EN' | 'FR' | 'ES') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, currentPage, onNavigate, onLogout, language, onSetLanguage }) => {
  const navItems = [
    { id: 'home', icon: 'fa-home', label: 'Home' },
    { id: 'dashboard', icon: 'fa-tshirt', label: 'Wardrobe' },
    { id: 'upload', icon: 'fa-cloud-upload-alt', label: 'Upload' },
    { id: 'recommendations', icon: 'fa-magic', label: 'Outfits' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-[#e5e1d8] flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-8 h-8 bg-[#4a4a4a] rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-coat"></i>
          </div>
          <span className="text-xl font-serif font-bold tracking-tight text-[#4a4a4a]">StyleSense</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                currentPage === item.id 
                  ? 'bg-[#4a4a4a] text-white shadow-md' 
                  : 'text-[#7a7a7a] hover:bg-[#faf9f6] hover:text-[#4a4a4a]'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-[#f2f0ea]">
        <button
          onClick={() => onNavigate('marketplace')}
          className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-6 ${
            currentPage === 'marketplace' 
              ? 'bg-[#8c7e6a] text-white shadow-md' 
              : 'text-[#7a7a7a] hover:bg-[#faf9f6]'
          }`}
        >
          <i className="fas fa-shopping-bag w-5"></i>
          <span>Marketplace</span>
        </button>

        <div className="flex items-center justify-between mb-6 px-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a9a9a]">Language</span>
          <select 
            value={language}
            onChange={(e) => onSetLanguage(e.target.value as any)}
            className="bg-transparent text-xs font-semibold text-[#7a7a7a] border-none focus:ring-0 cursor-pointer"
          >
            <option value="EN">English</option>
            <option value="FR">Français</option>
            <option value="ES">Español</option>
          </select>
        </div>

        <div className="flex items-center space-x-3 p-2 bg-[#faf9f6] rounded-2xl mb-4">
          <div className="w-10 h-10 bg-[#e5e1d8] rounded-full flex items-center justify-center text-[#8c7e6a]">
            <i className="fas fa-user text-sm"></i>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#4a4a4a] truncate">{user.name}</p>
            <p className="text-[10px] text-[#9a9a9a] truncate">{user.email}</p>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
        >
          <i className="fas fa-sign-out-alt mr-3"></i> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
