import React, { useState, useCallback, useEffect } from 'react';
import { SearchEngine, SearchEngineOption } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchEngineSelector from './components/SearchEngineSelector';
import Footer from './components/Footer';
import SettingsPanel from './components/SettingsPanel';
import AuthModal from './components/AuthModal';
import LicenseModal from './components/LicenseModal';
import MailboxModal from './components/MailboxModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal'; // Import new component
import TermsOfServiceModal from './components/TermsOfServiceModal'; // Import new component
import { YandexIcon, GoogleIcon, DuckDuckGoIcon, BingIcon, ShieldIcon, SpinnerIcon } from './components/icons';

const searchEngines: SearchEngineOption[] = [
  { id: SearchEngine.Yandex, name: 'Yandex', icon: YandexIcon, baseUrl: 'https://yandex.com/search/', queryParam: 'text' },
  { id: SearchEngine.Google, name: 'Google', icon: GoogleIcon, baseUrl: 'https://www.google.com/search', queryParam: 'q' },
  { id: SearchEngine.DuckDuckGo, name: 'DuckDuckGo', icon: DuckDuckGoIcon, baseUrl: 'https://duckduckgo.com/', queryParam: 'q' },
  { id: SearchEngine.Bing, name: 'Bing', icon: BingIcon, baseUrl: 'https://www.bing.com/search', queryParam: 'q' },
];

const themes = {
  hacker: { name: 'Hacker', gradientFrom: 'from-green-400', gradientTo: 'to-teal-400' },
  sunset: { name: 'Sunset', gradientFrom: 'from-orange-400', gradientTo: 'to-pink-500' },
  ocean: { name: 'Ocean', gradientFrom: 'from-blue-400', gradientTo: 'to-cyan-400' },
  nebula: { name: 'Nebula', gradientFrom: 'from-purple-400', gradientTo: 'to-indigo-500' },
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(SearchEngine.Yandex);
  const [isTorConnected, setIsTorConnected] = useState(false);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // State for Privacy Policy
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false); // State for Terms of Service
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  const [isIncognito, setIsIncognito] = useState(false);
  
  const [activeTheme, setActiveTheme] = useState('hacker');
  const [customBackground, setCustomBackground] = useState<string | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('thatguy_theme') || 'hacker';
    const savedCustomBg = localStorage.getItem('thatguy_custom_background');
    setActiveTheme(savedTheme);
    if (savedCustomBg) {
      setCustomBackground(savedCustomBg);
    }
  }, []);
  
  const onSearch = useCallback((query: string) => {
    if (query.trim() === '' || isSearching) return;

    setIsSearching(true);
    
    const engine = searchEngines.find(e => e.id === selectedEngine);
    if (!engine) {
      setIsSearching(false);
      return;
    }

    // Simulate anonymization delay and provide feedback
    setTimeout(() => {
      let url = `${engine.baseUrl}?${engine.queryParam}=${encodeURIComponent(query)}`;
      
      if (isTorConnected) {
        if (query.includes('.onion') || engine.id === SearchEngine.DuckDuckGo) {
          console.log(`[Tor] Simulating Tor search for: ${query}`);
        } else {
          console.log('[Tor] Simulation note: Tor routing is most effective for .onion addresses or DuckDuckGo.');
        }
      }
      
      console.log(`Executing search on ${engine.name}. URL: ${url}`);
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsSearching(false);
    }, 1500); // 1.5 second delay to simulate security measures

  }, [selectedEngine, isTorConnected, isSearching]);
  
  const generateApiKey = () => `tg_${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setApiKey(generateApiKey());
    setIsAuthModalOpen(false);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setApiKey(null);
  };
  
  const handleRegenerateApiKey = () => {
    setApiKey(generateApiKey());
  };

  const handleThemeChange = (theme: string) => {
    setActiveTheme(theme);
    localStorage.setItem('thatguy_theme', theme);
  };

  const handleCustomBackgroundUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomBackground(result);
        localStorage.setItem('thatguy_custom_background', result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleClearCustomBackground = () => {
    setCustomBackground(null);
    localStorage.removeItem('thatguy_custom_background');
  };

  const getStatusMessage = () => {
    if (isTorConnected) {
      return 'Connecting via Tor...';
    }
    return 'Securing Connection...';
  };

  const currentTheme = themes[activeTheme];
  const defaultBackgroundStyle = { 
    backgroundImage: `url('https://i.imgur.com/2OFOCME.gif')`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat' 
  };
  const backgroundStyle = customBackground 
    ? { backgroundImage: `url(${customBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } 
    : defaultBackgroundStyle;

  const themeClasses = `bg-gradient-to-tr ${currentTheme.gradientFrom} ${currentTheme.gradientTo} text-transparent bg-clip-text`;
  const incognitoClass = isIncognito ? 'grayscale' : '';

  return (
    <div 
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-white transition-all duration-500 ease-in-out ${incognitoClass}`}
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <Header 
        isTorConnected={isTorConnected}
        setIsTorConnected={setIsTorConnected}
        isLoggedIn={isLoggedIn}
        isIncognito={isIncognito}
        userEmail={userEmail}
        onLogout={handleLogout}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onMailboxClick={() => setIsMailboxOpen(true)}
      />
      
      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
        <h1 className={`text-7xl md:text-8xl font-black tracking-tighter mb-4 ${themeClasses} drop-shadow-lg`}>
          thatguy
        </h1>
        <p className="text-slate-400 mb-8 max-w-md">
          Your untraceable gateway to the web. All searches are anonymized through our secure network.
        </p>
        <div className="w-full">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={onSearch}
            isIncognito={isIncognito}
          />
          <SearchEngineSelector 
            engines={searchEngines}
            selectedEngine={selectedEngine}
            setSelectedEngine={setSelectedEngine}
          />
        </div>
      </main>

      <div className="relative z-10 mt-auto pt-8">
        <Footer 
          onLicenseClick={() => setIsLicenseModalOpen(true)}
          onPrivacyClick={() => setIsPrivacyModalOpen(true)}
          onTermsClick={() => setIsTermsModalOpen(true)}
        />
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isIncognito={isIncognito}
        onIncognitoToggle={() => setIsIncognito(!isIncognito)}
        themes={themes}
        activeTheme={activeTheme}
        onThemeChange={handleThemeChange}
        customBackground={customBackground}
        onCustomBackgroundUpload={handleCustomBackgroundUpload}
        onClearCustomBackground={handleClearCustomBackground}
        isLoggedIn={isLoggedIn}
        apiKey={apiKey}
        onRegenerateApiKey={handleRegenerateApiKey}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <LicenseModal 
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
      />

      <MailboxModal
        isOpen={isMailboxOpen}
        onClose={() => setIsMailboxOpen(false)}
        userEmail={userEmail}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      
      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
      
      {isSearching && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
            <SpinnerIcon className="w-16 h-16 text-purple-400" />
            <h2 className="text-2xl font-bold text-slate-200 mt-4">{getStatusMessage()}</h2>
            <p className="text-slate-400">Anonymizing your request through the thatguy network.</p>
        </div>
      )}
    </div>
  );
};

export default App;