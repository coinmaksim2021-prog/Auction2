import React from 'react';

const mainCollectionRarity = [
  { name: 'FOMO GOLD', chance: 0.2, count: 9, intensity: 'from-orange-300 to-orange-400' },
  { name: 'Legendary', chance: 1, count: 44, intensity: 'from-orange-400 to-orange-500' },
  { name: 'Epic', chance: 10, count: 444, intensity: 'from-orange-500 to-orange-600' },
  { name: 'Rare', chance: 25, count: 1111, intensity: 'from-orange-600 to-orange-700' },
  { name: 'Uncommon', chance: 63.8, count: 2836, intensity: 'from-orange-700 to-orange-800' }
];

const bidRanges = [
  { range: '< 500 USDC', bids: 57, percent: 35, intensity: 'from-emerald-300 to-emerald-400' },
  { range: '500–1000 USDC', bids: 45, percent: 28, intensity: 'from-emerald-400 to-emerald-500' },
  { range: '1000–2000 USDC', bids: 23, percent: 22, intensity: 'from-emerald-500 to-emerald-600' },
  { range: '> 2000 USDC', bids: 12, percent: 15, intensity: 'from-emerald-600 to-emerald-700' }
];

const RaritySection = ({ timeLeft }) => {
  // Логика скрытия: за час до окончания (days = 0, hours = 0)
  const isBlindModeHidden = timeLeft.days === 0 && timeLeft.hours === 0;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Main Collection Rarity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Collection Rarity</h3>
        <div className="space-y-3">
          {mainCollectionRarity.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.intensity}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.chance}% ({item.count})</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${item.intensity} rounded-full`} style={{ width: `${Math.min(item.chance * 1.5, 100)}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blind Mode Active */}
      <div className="card relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Blind Mode Active</h3>
          <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-600">Live</span>
          </div>
        </div>
        
        {!isBlindModeHidden ? (
          // Открытое состояние - показываем диапазоны
          <>
            <p className="text-sm text-gray-600 mb-4">Bid amounts hidden. Only ranges visible.</p>
            <div className="space-y-3">
              {bidRanges.map((range, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-gray-900">{range.range}</span>
                    <span className="text-xs font-semibold text-gray-700">{range.bids} bids</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${range.intensity} rounded-full transition-all duration-500`} 
                      style={{ width: `${range.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Скрытое состояние - за час до окончания
          <>
            <p className="text-sm text-red-600 font-medium mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Final hour - All bid data hidden
            </p>
            <div className="space-y-3 relative">
              {/* Заблюренный контент */}
              <div className="filter blur-md select-none pointer-events-none">
                {bidRanges.map((range, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-gray-900">{range.range}</span>
                      <span className="text-xs font-semibold text-gray-700">{range.bids} bids</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${range.intensity} rounded-full`} 
                        style={{ width: `${range.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Оверлей с иконкой */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
                <svg className="w-16 h-16 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <p className="text-sm font-semibold text-gray-700 mb-1">Blind Bidding Active</p>
                <p className="text-xs text-gray-500 text-center px-4">
                  All bid ranges hidden for final hour.<br/>Place your bid blind!
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RaritySection;
