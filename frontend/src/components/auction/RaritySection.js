import React from 'react';

const mainCollectionRarity = [
  { name: 'FOMO GOLD', chance: 0.2, count: 9, color: 'bg-yellow-500' },
  { name: 'Legendary', chance: 1, count: 44, color: 'bg-orange-500' },
  { name: 'Epic', chance: 10, count: 444, color: 'bg-purple-500' },
  { name: 'Rare', chance: 25, count: 1111, color: 'bg-blue-500' },
  { name: 'Uncommon', chance: 63.8, count: 2836, color: 'bg-green-500' }
];

const bidRanges = [
  { range: '< 500 USDC', bids: 57, percent: 35 },
  { range: '500–1000 USDC', bids: 45, percent: 28 },
  { range: '1000–2000 USDC', bids: 23, percent: 22 },
  { range: '> 2000 USDC', bids: 12, percent: 15 }
];

const RaritySection = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Main Collection Rarity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Collection Rarity</h3>
        <div className="space-y-3">
          {mainCollectionRarity.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.chance}% ({item.count})</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.min(item.chance * 1.5, 100)}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blind Mode Active */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Blind Mode Active</h3>
          <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-600">Live</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Bid amounts hidden. Only ranges visible.</p>
        <div className="space-y-3">
          {bidRanges.map((range, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-gray-700">{range.range}</span>
                <span className="text-xs text-gray-500">{range.bids} bids</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: `${range.percent}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaritySection;
