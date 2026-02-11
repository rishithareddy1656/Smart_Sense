
import React from 'react';
import { User } from '../types';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  language: string;
  onSetLanguage: (lang: 'EN' | 'FR' | 'ES') => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  currentPage, 
  onNavigate, 
  onLogout,
  language,
  onSetLanguage
}) => {
  // If no user, show simple layout (just children)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf9f6]">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar 
        user={user} 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        language={language}
        onSetLanguage={onSetLanguage}
      />
      <main className="flex-1 p-8 md:p-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
