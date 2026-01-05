import React, { useState } from 'react';

/**
 * Compact Footer for FOMO Strategy
 * Features: Resources, Legal Links, 2 Platform Buttons
 */

function Footer() {
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: '' });

  const legalPages = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      content: 'Privacy policy content here...'
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      content: 'Terms of service content here...'
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: 'Disclaimer content here...'
    }
  ];

  const openLegalModal = (pageId) => {
    const page = legalPages.find(p => p.id === pageId);
    if (page) {
      setLegalModal({ isOpen: true, title: page.title, content: page.content });
    }
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            
            {/* Left: Logo + Description */}
            <div className="space-y-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_crypto-dashboard-91/artifacts/6ozprlkp_Main%20Logo.svg" 
                alt="FOMO Strategy" 
                className="h-8"
              />
              <p className="text-sm text-gray-600 leading-relaxed">
                NFT Buyback & Burn strategy for sustainable value creation.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Automated perpetual machine combining NFT and token buybacks.
              </p>
            </div>

            {/* Platform Buttons - Компактные */}
            <div className="flex flex-col gap-2">
              <a
                href="https://www.fomo.cx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1.5 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all btn-hover-lift w-fit"
              >
                FOMO Platform
              </a>
              <a
                href="https://www.fomo.wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-900 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all btn-hover-lift w-fit"
              >
                FOMO Info
              </a>
            </div>

            {/* Resources - 1 column with 3 items */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Resources</h3>
              <div className="flex flex-col gap-2">
                <a href="#about" className="text-sm text-gray-600 hover:text-emerald-600 hover:translate-x-1 transition-all duration-200">About</a>
                <a href="#fomo-strategy" className="text-sm text-gray-600 hover:text-emerald-600 hover:translate-x-1 transition-all duration-200">FOMO Strategy</a>
                <a href="#nft-market" className="text-sm text-gray-600 hover:text-emerald-600 hover:translate-x-1 transition-all duration-200">NFT Market</a>
              </div>
            </div>

            {/* Legal - 1 column with 3 items */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Legal</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => openLegalModal('privacy')} className="text-sm text-gray-600 hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 text-left">Privacy</button>
                <button onClick={() => openLegalModal('disclaimer')} className="text-sm text-gray-600 hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 text-left">Disclaimer</button>
                <button onClick={() => openLegalModal('terms')} className="text-sm text-gray-600 hover:text-emerald-600 hover:translate-x-1 transition-all duration-200 text-left">Terms</button>
              </div>
            </div>
          </div>

          {/* Bottom: Copyright - Compact */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} FOMO Strategy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalModal.isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[9999] flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLegalModal({ isOpen: false, title: '', content: '' })}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{legalModal.title}</h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>{legalModal.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
