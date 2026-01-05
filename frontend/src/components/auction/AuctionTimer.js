import React from 'react';

const AuctionTimer = ({ timeLeft }) => {
  return (
    <div className="relative">
      {/* Urgency indicator - fixed to top right, only in last hour */}
      {timeLeft.days === 0 && timeLeft.hours === 0 && (
        <div className="absolute top-0 right-0 z-20 animate-pulse-scale">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-bold tracking-wide">LAST HOUR — Place your bid now!</span>
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">FOMO Auction</h1>
        
        {/* Timer - Centered with trademark-style label */}
        <div className="inline-block relative">
          {/* "Auction ends in" - corner style, top-left */}
          <span className="absolute top-2 -left-24 text-[9px] text-gray-400 uppercase tracking-wider whitespace-nowrap">
            Auction ends in
          </span>
          
          {/* Timer digits */}
          <div className="flex items-center justify-center gap-1 md:gap-2">
            <TimerDigit value={timeLeft.days} label="DAYS" />
            <Separator />
            <TimerDigit value={timeLeft.hours} label="HOURS" />
            <Separator />
            <TimerDigit value={timeLeft.minutes} label="MIN" />
            <Separator />
            <TimerDigit value={timeLeft.seconds} label="SEC" isSeconds />
          </div>
        </div>
        
        {/* Subtitle - below timer */}
        <p className="text-gray-600 mt-4">4,444 NFTs • Blind Bidding</p>
      </div>
    </div>
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
  <span className="text-2xl md:text-4xl text-gray-300 font-light mx-1">:</span>
);

export default AuctionTimer;
