import React from 'react';
import { CloseIcon } from './icons';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl m-4 max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-200">
            Privacy Policy
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <CloseIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-slate-400 text-sm space-y-4">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <p>Your privacy is the core principle of thatguy Browser. This policy outlines our commitment to protecting your data (by not collecting it in the first place).</p>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">1. No Data Collection</h3>
                <p>We do not collect, log, or store any of your personal information or browsing activity. This includes:</p>
                <ul className="list-disc list-inside pl-4 mt-2">
                    <li>Search queries</li>
                    <li>Browsing history</li>
                    <li>IP addresses</li>
                    <li>Cookies and tracking data</li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">2. Simulated Security Features</h3>
                <p>Features like the Tor connection and the thatguyVPN are simulations designed to promote privacy awareness. They do not connect to the actual Tor network or a real VPN service but operate within the confines of the application to anonymize requests to third-party search engines.</p>
            </div>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">3. User Accounts &amp; Email</h3>
                <p>The thatguy account and @thatguy.thatguy email service are self-contained within this application for personalization. Your account information is not shared with any third party and is not linked to your real-world identity. The email service is a simulation and does not send or receive external emails.</p>
            </div>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">4. Local Storage</h3>
                <p>thatguy Browser uses your browser's local storage to save your preferences, such as your selected theme and custom background image. This data is stored only on your device and is never transmitted to any server.</p>
            </div>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">5. Incognito Mode</h3>
                <p>When Incognito Mode is active, no search history from that session is stored, providing an additional layer of local privacy.</p>
            </div>

            <p>We are committed to true privacy and will never compromise on our promise to keep your browsing your own business.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;