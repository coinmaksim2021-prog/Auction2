import React from 'react';

const LastChanceSection = ({ timeLeft, onPlaceBid }) => (
  <div className="mt-12 mb-12 py-12 text-center">
    <div className="flex items-center justify-center gap-2 text-red-500 mb-6">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-lg">Time left: <span className="font-semibold">{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span></span>
    </div>
    
    <h2 className="text-4xl font-bold text-gray-900 mb-6">Last Chance – Last Hero</h2>
    
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      The last 3 bids will receive "Last Heroes" status. One guaranteed <span className="text-emerald-600 font-semibold">Uncommon+</span>
    </p>
    
    <button 
      onClick={onPlaceBid}
      className="inline-flex items-center justify-center px-12 py-4 bg-gray-900 text-white text-lg font-semibold rounded-2xl hover:bg-black transition-all shadow-lg hover:shadow-xl"
    >
      Place Bid
    </button>
  </div>
);

export default LastChanceSection;
