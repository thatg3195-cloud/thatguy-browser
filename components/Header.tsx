import React from 'react';
import { OnionIcon, ShieldIcon, GearIcon, UserIcon, IncognitoIcon, GitHubIcon, EmailIcon } from './icons';

interface HeaderProps {
  isTorConnected: boolean;
  setIsTorConnected: (connected: boolean) => void;
  isLoggedIn: boolean;
  isIncognito: boolean;
  userEmail: string | null;
  onLogout: () => void;
  onSettingsClick: () => void;
  onLoginClick: () => void;
  onMailboxClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isTorConnected, 
  setIsTorConnected,
  isLoggedIn,
  isIncognito,
  userEmail,
  onLogout,
  onSettingsClick,
  onLoginClick,
  onMailboxClick,
}) => {
  const toggleTor = () => setIsTorConnected(!isTorConnected);

  return (
    <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
      <div className="flex items-center gap-2 text-xl font-bold">
        <ShieldIcon className="w-6 h-6 text-purple-400"/>
        <span>thatguy</span>
        {isIncognito && <IncognitoIcon className="w-6 h-6 text-slate-400"><title>Incognito Mode Active</title></IncognitoIcon>}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTor}
          title="Toggle Tor Connection"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105
            ${isTorConnected 
              ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/50' 
              : 'bg-red-500/20 text-red-300 ring-1 ring-red-500/50'
            }`}
        >
          <OnionIcon className="w-5 h-5"/>
          <span className="hidden sm:inline">Tor: {isTorConnected ? 'Active' : 'Inactive'}</span>
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isTorConnected ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isTorConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </span>
        </button>

        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-700/50 transition-colors" title="GitHub">
          <GitHubIcon className="w-6 h-6 text-slate-300" />
        </a>

        {isLoggedIn && (
           <button onClick={onMailboxClick} className="p-2 rounded-full hover:bg-slate-700/50 transition-colors" title="thatguy Mail">
             <EmailIcon className="w-6 h-6 text-slate-300" />
           </button>
        )}

        <button onClick={onSettingsClick} className="p-2 rounded-full hover:bg-slate-700/50 transition-colors" title="Settings">
          <GearIcon className="w-6 h-6 text-slate-300" />
        </button>

        {isLoggedIn ? (
          <div className="group relative">
            <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors" title={userEmail || 'Profile'}>
              <UserIcon className="w-6 h-6 text-purple-400" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
              <div className="p-2 text-sm text-slate-400 truncate">{userEmail}</div>
              <div className="border-t border-slate-700"></div>
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button onClick={onLoginClick} className="px-4 py-2 text-sm font-semibold bg-purple-600/50 hover:bg-purple-600/80 rounded-full transition-colors">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;