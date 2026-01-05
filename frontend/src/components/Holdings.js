import React, { useState } from 'react';
import { getRarity } from '../utils/nftUtils';

function Holdings({ strategyState }) {
  const [sortBy, setSortBy] = useState('price');
  const [showSortMenu, setShowSortMenu] = useState(false);

  if (!strategyState || !strategyState.nfts) {
    return null;
  }

  const holdings = strategyState.nfts.filter(nft => nft.owner === 'strategy');
  const totalValue = holdings.reduce((sum, nft) => sum + (nft.price_eth || 0), 0);

  const sortOptions = [
    { value: 'price', label: 'Price: High to Low', icon: '↓' },
    { value: 'price-low', label: 'Price: Low to High', icon: '↑' },
    { value: 'date', label: 'Recently Added', icon: '🕐' }
  ];

  return (
    <div className="card animate-fade-in border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Holdings</h3>
          <p className="text-gray-600 mt-1 text-sm font-normal">
            Strategy is holding {holdings.length} NFTs valued at {totalValue.toFixed(2)} ETH
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span className="text-sm text-gray-700 font-medium">Sort</span>
            </button>
            
            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                      sortBy === option.value ? 'bg-gray-50 font-semibold' : 'font-normal'
                    } ${option.value === sortOptions[0].value ? 'rounded-t-xl' : ''} ${
                      option.value === sortOptions[sortOptions.length - 1].value ? 'rounded-b-xl' : ''
                    }`}
                  >
                    <span className="text-gray-900">{option.label}</span>
                    {sortBy === option.value && (
                      <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://www.fomo.cx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:from-gray-900 hover:to-black shadow-sm hover:shadow-md transition-all"
            data-testid="buy-nft-button"
          >
            Buy NFT →
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {holdings.slice(0, 18).map((nft) => {
          const rarity = getRarity(nft.token_id);
          return (
            <div 
              key={nft.token_id} 
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ 
                background: '#F5FBFD',
                boxShadow: '2px 2px 8px 2px rgba(0, 5, 48, 0.08)'
              }}
            >
              {/* Image container with badges */}
              <div className="relative">
                <img
                  src={nft.image}
                  alt={`FomoNFT #${nft.token_id}`}
                  className="w-full aspect-square object-cover rounded-t-2xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300/000000/00FF87?text=F';
                  }}
                />
                {/* Rarity badge - TOP RIGHT */}
                <div className={`absolute top-2 right-2 ${rarity.bg} backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm`}>
                  <span className={`text-xs font-semibold ${rarity.color}`}>{rarity.name}</span>
                </div>
                {/* Token ID badge - BOTTOM LEFT */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-bold text-gray-900">#{nft.token_id}</span>
                </div>
              </div>
              
              {/* Card info */}
              <div className="p-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">F</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">FOMO NFT</p>
                    <p className="text-[10px] text-gray-500">Collection</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{nft.price_eth} ETH</p>
                    <p className="text-[10px] text-gray-500">~${(nft.price_eth * 3200).toFixed(0)}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {holdings.length > 18 && (
        <div className="text-center mt-6">
          <button className="btn-outline">Load More NFTs</button>
        </div>
      )}
    </div>
  );
}

export default Holdings;