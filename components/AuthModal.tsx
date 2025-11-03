import React, { useState } from 'react';
import { CloseIcon, ShieldIcon } from './icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

type AuthTab = 'login' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'signup') {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!email.endsWith('@thatguy.thatguy')) {
        setError("Email must end with @thatguy.thatguy");
        return;
      }
      // Simulate successful signup and login
      onLogin(email);
    } else {
      // Simulate successful login
      if (email && password) {
        onLogin(email);
      } else {
        setError("Please fill in all fields.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center" onClick={onClose}>
      <div 
        className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-sm m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-slate-200">
            {activeTab === 'login' ? 'Login' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <CloseIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex border-b border-slate-700 mb-6">
            <button 
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-2 text-center font-semibold transition-colors ${activeTab === 'login' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setActiveTab('signup')}
              className={`flex-1 pb-2 text-center font-semibold transition-colors ${activeTab === 'signup' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            {activeTab === 'signup' && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors">
              {activeTab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {activeTab === 'signup' && (
            <div className="mt-6 text-center text-xs text-slate-400 flex items-start gap-2">
              <ShieldIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
              <span>
                Sign up for a free, secure <strong className="text-slate-300">@thatguy.thatguy</strong> email with no IP address logging. Perfect for staying incognito across the web. Your privacy is our mission.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;