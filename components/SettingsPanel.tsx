import React, { useRef, useState } from 'react';
import { CloseIcon, IncognitoIcon, PaletteIcon, ImageIcon, UserIcon, CopyIcon, RefreshIcon } from './icons';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isIncognito: boolean;
  onIncognitoToggle: () => void;
  themes: Record<string, { name: string; gradientFrom: string; gradientTo: string }>;
  activeTheme: string;
  onThemeChange: (theme: string) => void;
  customBackground: string | null;
  onCustomBackgroundUpload: (file: File) => void;
  onClearCustomBackground: () => void;
  isLoggedIn: boolean;
  apiKey: string | null;
  onRegenerateApiKey: () => void;
}

type SettingsTab = 'appearance' | 'privacy' | 'account';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  isOpen, 
  onClose,
  isIncognito,
  onIncognitoToggle,
  themes,
  activeTheme,
  onThemeChange,
  customBackground,
  onCustomBackgroundUpload,
  onClearCustomBackground,
  isLoggedIn,
  apiKey,
  onRegenerateApiKey
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey).then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy'), 2000);
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCustomBackgroundUpload(file);
    }
  };
  
  if (!isOpen) return null;
  
  const TabButton: React.FC<{ tabName: SettingsTab; icon: React.ReactNode; label: string }> = ({ tabName, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
        activeTab === tabName
          ? 'bg-slate-700 text-slate-100'
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={onClose}
      ></div>
      <div 
        className="fixed top-0 right-0 h-full w-80 bg-slate-800/95 backdrop-blur-lg border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-slate-200">Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <CloseIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-2 border-b border-slate-700">
            <div className="flex items-center gap-2">
                <TabButton tabName="appearance" icon={<PaletteIcon className="w-5 h-5"/>} label="Appearance" />
                <TabButton tabName="privacy" icon={<IncognitoIcon className="w-5 h-5"/>} label="Privacy" />
                {isLoggedIn && <TabButton tabName="account" icon={<UserIcon className="w-5 h-5"/>} label="Account" />}
            </div>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-121px)]">
          {/* Appearance Tab Content */}
          {activeTab === 'appearance' && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-purple-400">Color Theme</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <button 
                      key={key} 
                      onClick={() => onThemeChange(key)}
                      className={`p-2 rounded-lg text-left transition-all ring-2 ${activeTheme === key ? 'ring-purple-500' : 'ring-transparent hover:ring-purple-500/50'}`}
                    >
                      <div className={`w-full h-8 rounded bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo}`}></div>
                      <span className="text-sm mt-2 block text-slate-300">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-purple-400">Background</h3>
                <div className="pt-2 space-y-2">
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
                  <button onClick={handleUploadClick} className="w-full p-2 text-sm font-semibold text-center bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">
                    Upload Your Own Image
                  </button>
                  {customBackground && (
                    <button onClick={onClearCustomBackground} className="w-full p-2 text-sm font-semibold text-center text-red-400 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors">
                      Clear Custom Background
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Privacy Tab Content */}
          {activeTab === 'privacy' && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-purple-400">Privacy Controls</h3>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">Incognito Mode</span>
                <div className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isIncognito ? 'bg-purple-600' : 'bg-slate-600'}`}>
                  <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isIncognito ? 'translate-x-6' : 'translate-x-1'}`} />
                  <input type="checkbox" className="absolute w-full h-full opacity-0" checked={isIncognito} onChange={onIncognitoToggle} />
                </div>
              </label>
              <p className="text-xs text-slate-500">When enabled, searches will not be saved in your session.</p>
            </div>
          )}

          {/* Account Tab Content */}
          {activeTab === 'account' && isLoggedIn && apiKey && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-purple-400">Account Details</h3>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Your API Key</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-2">
                  <span className="font-mono text-xs text-slate-300 truncate flex-1">{apiKey}</span>
                  <button onClick={onRegenerateApiKey} title="Regenerate Key" className="p-1 text-slate-400 hover:text-white transition-colors">
                    <RefreshIcon className="w-4 h-4" />
                  </button>
                  <button onClick={handleCopyApiKey} title="Copy Key" className="p-1 text-slate-400 hover:text-white transition-colors">
                    {copyStatus === 'Copy' ? <CopyIcon className="w-4 h-4" /> : <span className="text-xs text-green-400">{copyStatus}</span>}
                  </button>
                </div>
                <p className="text-xs text-slate-500">This key is for simulated API access. Keep it secret, keep it safe!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;