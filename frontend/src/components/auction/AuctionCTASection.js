import React from 'react';

const AuctionCTASection = ({ timeLeft, onPlaceBid }) => {
  const scrollToPlaceBid = () => {
    const placeBidSection = document.querySelector('[data-section="place-bid"]');
    if (placeBidSection) {
      placeBidSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Also trigger the bid modal
    if (onPlaceBid) onPlaceBid();
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 mt-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-red-700">Limited Time Auction</span>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">Don't Miss Your Chance</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Secure your spot in the FOMO NFT collection. Higher bids unlock rarer NFTs with better rewards and multipliers.
        </p>

        {/* Compact Timer */}
        <div className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl mb-8">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-mono text-lg">
            {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
          <span className="text-gray-400 text-sm">remaining</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button 
            onClick={scrollToPlaceBid}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Place Bid Now →
          </button>
          <a
            href="https://www.fomo.cx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold text-base hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Learn More
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-8 text-gray-400 text-sm mb-10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure Bidding</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Verified NFTs</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>USDC Payments</span>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 transition-all duration-300 hover:scale-125"
            title="X (Twitter)"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 transition-all duration-300 hover:scale-125"
            title="Discord"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 transition-all duration-300 hover:scale-125"
            title="Telegram"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AuctionCTASection;
