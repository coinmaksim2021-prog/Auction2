import React, { useState } from 'react';

const gamificationData = [
  {
    id: 'unique-bid',
    icon: 'scale',
    title: 'Unique Bid Bonus',
    shortDesc: 'The more unique your bid, the higher rarity chance',
    fullDesc: 'The more unique your bid amount, the higher your chance for increased NFT rarity. Bids matching other participants (mass-market amounts) are deprioritized in distribution. Use unusual amounts to maximize your chances!'
  },
  {
    id: 'reveal-delay',
    icon: 'sparkle',
    title: 'Reveal Delay',
    shortDesc: 'NFTs visually revealed in 1-3 days',
    fullDesc: 'All NFTs receive visual reveal 1–3 days after auction ends. This creates suspense and intrigue, and stimulates secondary market activity. The wait for reveal adds excitement to the process!'
  },
  {
    id: 'early-bid',
    icon: 'gift',
    title: 'Early-Bid Bonus',
    shortDesc: 'First 24 hours → +5% rarity boost',
    fullDesc: 'Bids placed in the first 24 hours of the auction receive a +5% bonus to NFT rarity chance. Early participants gain advantage for their activity and belief in the project!'
  },
  {
    id: 'hidden-boost',
    icon: 'star',
    title: 'Hidden Boost',
    shortDesc: 'Random lot receives +2 rarity levels',
    fullDesc: 'In each bid price range (e.g., 0.5-1.0 ETH, 1.0-2.0 ETH), there is a chance of activating a unique event — Hidden Boost. This is a hidden mechanic where one random participant in that range receives an NFT two levels higher than they deserve by bid and competition. This can turn Common into Epic or Rare into Legendary!'
  }
];

const MechanicIcon = ({ type }) => {
  const icons = {
    scale: (
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    sparkle: (
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    gift: (
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    star: (
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  };
  return icons[type] || icons.star;
};

const GamificationMechanics = () => {
  const [expandedMechanic, setExpandedMechanic] = useState(null);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Gamification Mechanics
      </h3>
      
      <div className="space-y-2">
        {gamificationData.map((mechanic) => (
          <div key={mechanic.id} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedMechanic(expandedMechanic === mechanic.id ? null : mechanic.id)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MechanicIcon type={mechanic.icon} />
                <div className="text-left">
                  <p className="font-medium text-gray-900 text-sm">{mechanic.title}</p>
                  <p className="text-xs text-gray-500">{mechanic.shortDesc}</p>
                </div>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform ${expandedMechanic === mechanic.id ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expandedMechanic === mechanic.id && (
              <div className="px-3 pb-3">
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {mechanic.fullDesc}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamificationMechanics;
