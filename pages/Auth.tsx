
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    onLogin({
      name: formData.name || 'Alex Morgan',
      email: formData.email || 'alex@example.com'
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-[#e5e1d8]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#2d2d2d] mb-2">
            {isLogin ? 'Welcome Back' : 'Join StyleSense'}
          </h2>
          <p className="text-[#7a7a7a]">The future of your personal style starts here.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#7a7a7a] mb-2">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e5e1d8] rounded-xl focus:ring-1 focus:ring-[#8c7e6a] outline-none transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#7a7a7a] mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e5e1d8] rounded-xl focus:ring-1 focus:ring-[#8c7e6a] outline-none transition-all"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#7a7a7a] mb-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-3 bg-[#faf9f6] border border-[#e5e1d8] rounded-xl focus:ring-1 focus:ring-[#8c7e6a] outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-[#4a4a4a] text-white rounded-xl font-medium shadow-md hover:bg-[#333] transition-all"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#f2f0ea] text-center">
          <p className="text-[#7a7a7a] text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-[#8c7e6a] hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
