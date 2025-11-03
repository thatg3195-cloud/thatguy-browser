import React from 'react';
import { CloseIcon, EmailIcon, ShieldIcon } from './icons';

interface MailboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
}

const MailboxModal: React.FC<MailboxModalProps> = ({ isOpen, onClose, userEmail }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl m-4 max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <EmailIcon className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-slate-200">
              thatguy Mail
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <CloseIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-2 sm:p-4 md:p-6 overflow-y-auto text-slate-400 text-sm">
            <div className="p-2 text-center text-xs text-slate-500 mb-4">
                Your secure address: <span className="font-mono text-purple-300">{userEmail}</span>
            </div>

            {/* Simulated Email */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
                <div className="p-3 border-b border-slate-700">
                    <p className="text-xs text-slate-500">From: <span className="text-slate-300">thatguy Team &lt;noreply@thatguy.thatguy&gt;</span></p>
                    <h3 className="font-bold text-slate-100 mt-1">Welcome to your secure inbox!</h3>
                </div>
                <div className="p-4 space-y-4 text-slate-300">
                    <p>Welcome to thatguy Mail, your new anonymous and secure email service.</p>
                    <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <ShieldIcon className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-green-300">Your Privacy, Guaranteed:</h4>
                            <ul className="list-disc list-inside text-xs text-slate-400 mt-1">
                                <li><strong>No IP Address Logging:</strong> Your location is never recorded.</li>
                                <li><strong>End-to-End Simulation:</strong> Messages are protected.</li>
                                <li><strong>Anonymous by Design:</strong> Perfect for incognito browsing.</li>
                            </ul>
                        </div>
                    </div>
                    <p>You can now use your <strong className="text-purple-300">@{userEmail?.split('@')[1]}</strong> address to sign up for services without revealing your identity.</p>
                    <p>Stay safe,<br/>The thatguy Browser Team</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MailboxModal;
