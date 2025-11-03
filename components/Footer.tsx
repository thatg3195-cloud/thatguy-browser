import React from 'react';

interface FooterProps {
  onLicenseClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLicenseClick, onPrivacyClick, onTermsClick }) => {
  return (
    <footer className="w-full p-4 text-center text-slate-500 text-xs">
      <div className="flex justify-center gap-4 flex-wrap">
        <a href="#" onClick={(e) => { e.preventDefault(); onPrivacyClick(); }} className="hover:text-purple-400 transition-colors">Privacy Policy</a>
        <span>|</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onTermsClick(); }} className="hover:text-purple-400 transition-colors">Terms of Service</a>
        <span>|</span>
        <a href="mailto:thatg3195@gmail.com" className="hover:text-purple-400 transition-colors">Contact</a>
        <span>|</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onLicenseClick(); }} className="hover:text-purple-400 transition-colors">License</a>
      </div>
      <p className="mt-2">© {new Date().getFullYear()} thatguy Browser. All rights reserved. Your privacy is our priority.</p>
      <p className="mt-2">Made with Google AI Studio</p>
    </footer>
  );
};

export default Footer;