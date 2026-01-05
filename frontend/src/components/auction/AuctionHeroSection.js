import React from 'react';

const AuctionHeroSection = ({ timeLeft, totalBids, participants, onPlaceBid }) => {
  return (
    <section className="relative py-16 mb-8">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-[350px] h-[350px] bg-teal-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Urgency Banner - Last Hour */}
        {timeLeft.days === 0 && timeLeft.hours === 0 && (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg mb-6 animate-pulse-scale">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-bold tracking-wide">LAST HOUR — Don't miss out!</span>
          </div>
        )}

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          FOMO NFT Auction
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Blind bidding for 4,444 unique NFTs. Higher bids unlock rarer tiers. 
          Your final NFT rarity is revealed after the auction ends.
        </p>

        {/* Timer */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Auction ends in</p>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <TimerDigit value={timeLeft.days} label="DAYS" />
            <Separator />
            <TimerDigit value={timeLeft.hours} label="HOURS" />
            <Separator />
            <TimerDigit value={timeLeft.minutes} label="MIN" />
            <Separator />
            <TimerDigit value={timeLeft.seconds} label="SEC" isSeconds />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button 
            onClick={onPlaceBid}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-base hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl transition-all"
          >
            Place Your Bid →
          </button>
          <a
            href="#how-it-works"
            className="bg-white border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold text-base hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            How It Works
          </a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalBids}</div>
            <p className="text-sm text-gray-500">Total Bids</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900 mb-1">{participants}</div>
            <p className="text-sm text-gray-500">Participants</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-emerald-600 mb-1">100 USDC</div>
            <p className="text-sm text-gray-500">Minimum Bid</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimerDigit = ({ value, label, isSeconds = false }) => (
  <div className="text-center">
    <div className={`text-4xl md:text-6xl font-bold tracking-tight tabular-nums ${isSeconds ? 'text-emerald-600' : 'text-gray-900'}`}>
      {String(value).padStart(2, '0')}
    </div>
    <div className={`text-[10px] mt-1 font-medium tracking-wider ${isSeconds ? 'text-emerald-500' : 'text-gray-400'}`}>
      {label}
    </div>
  </div>
);

const Separator = () => (
  <span className="text-2xl md:text-4xl text-gray-300 font-light">:</span>
);

export default AuctionHeroSection;
