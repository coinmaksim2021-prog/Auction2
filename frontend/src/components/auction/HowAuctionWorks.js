import React from 'react';

const steps = [
  { step: '1', title: 'Place Blind Bid', desc: 'Your bid stays hidden from others' },
  { step: '2', title: 'Rarity Calculated', desc: 'Higher bids = better rarity odds' },
  { step: '3', title: 'Auction Ends', desc: 'NFTs distributed by bid amount' },
  { step: '4', title: 'Reveal & Earn XP', desc: 'Get your NFT + XP boost' }
];

const HowAuctionWorks = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">How Auction Works</h3>
      <div className="grid grid-cols-4 gap-4">
        {steps.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">
              {item.step}
            </div>
            <p className="font-medium text-gray-900 text-sm mb-1">{item.title}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowAuctionWorks;
