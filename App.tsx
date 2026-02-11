
import React, { useState, useEffect } from 'react';
import { WardrobeItem, User } from './types';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Recommendations from './pages/Recommendations';
import Marketplace from './pages/Marketplace';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [language, setLanguage] = useState<'EN' | 'FR' | 'ES'>('EN');

  // Sync wardrobe when user changes
  useEffect(() => {
    if (user) {
      const savedWardrobe = localStorage.getItem(`styleSense_wardrobe_${user.email}`);
      if (savedWardrobe) {
        setWardrobe(JSON.parse(savedWardrobe));
      } else {
        setWardrobe([]);
      }
    }
  }, [user]);

  // Persist wardrobe changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`styleSense_wardrobe_${user.email}`, JSON.stringify(wardrobe));
    }
  }, [wardrobe, user]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('styleSense_currentUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('styleSense_currentUser');
    setCurrentPage('home');
  };

  const addItem = (item: WardrobeItem) => setWardrobe(prev => [item, ...prev]);
  const removeItem = (id: string) => setWardrobe(prev => prev.filter(item => item.id !== id));

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onStart={() => user ? setCurrentPage('dashboard') : setCurrentPage('auth')} />;
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard wardrobe={wardrobe} onRemoveItem={removeItem} onNavigate={setCurrentPage} />;
      case 'upload':
        return <Upload onUploadSuccess={addItem} onNavigate={setCurrentPage} />;
      case 'recommendations':
        return <Recommendations wardrobe={wardrobe} onNavigate={setCurrentPage} />;
      case 'marketplace':
        return <Marketplace wardrobe={wardrobe} />;
      default:
        return <Home onStart={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <Layout 
      user={user} 
      currentPage={currentPage} 
      onNavigate={setCurrentPage} 
      onLogout={handleLogout}
      language={language}
      onSetLanguage={setLanguage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
