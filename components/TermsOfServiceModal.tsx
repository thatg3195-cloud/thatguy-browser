import React from 'react';
import { CloseIcon } from './icons';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl m-4 max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-200">
            Terms of Service
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <CloseIcon className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-slate-400 text-sm space-y-4">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            
            <p>Welcome to thatguy Browser ("the Software"). By using our software, you agree to these terms. Please read them carefully.</p>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">1. Use of Software</h3>
                <p>This software is provided for personal, non-commercial use. You agree not to use the software for any illegal or unauthorized purpose. The software is governed by the MIT License, which grants you broad permissions to use, copy, modify, and distribute the software.</p>
            </div>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">2. Disclaimer of Warranty</h3>
                <p>The Software is provided "AS IS", without warranty of any kind, express or implied. The security and privacy features within this application, including the Tor connection, are simulations. We make no guarantee of absolute security or anonymity and disclaim all warranties regarding the software's performance, reliability, or suitability for a particular purpose.</p>
            </div>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">3. Limitation of Liability</h3>
                <p>In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.</p>
            </div>
            
            <div>
                <h3 className="font-bold text-slate-200 mb-2">4. User Accounts</h3>
                <p>You are responsible for any activity that occurs through your simulated account. The account system is for personalization and does not offer the same security as a production-level service.</p>
            </div>

            <div>
                <h3 className="font-bold text-slate-200 mb-2">5. Changes to Terms</h3>
                <p>We may modify these terms at any time. We will notify you of any changes by posting the new terms within the application. Your continued use of the software after such changes constitutes your acceptance of the new terms.</p>
            </div>

            <p>For more details on data handling, please review our <strong className="text-slate-300">Privacy Policy</strong>.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceModal;