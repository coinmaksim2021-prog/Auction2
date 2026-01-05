import React from 'react';
import { getRarity } from '../utils/nftUtils';

function Sales({ strategyState }) {
  if (!strategyState || !strategyState.nfts) {
    return null;
  }

  // Get sold NFTs (owner not 'strategy')
  const sales = strategyState.nfts.filter(nft => nft.owner !== 'strategy').slice(0, 15);
  const activity = strategyState.activity || {};
  
  // Calculate total profit - use absolute value for display
  const ethReceived = activity.eth_received_from_sales || 0;
  const ethSpent = activity.eth_spent_on_buybacks || 0;
  const totalProfit = Math.abs(ethReceived - ethSpent);

  return (
    <div className="card animate-fade-in">
      {/* Header with highlighted stats */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Sales</h3>
          <p className="text-gray-600 mt-1">
            Strategy sold <span className="font-semibold text-gray-900">{activity.nft_sold_total || 0} NFTs</span> for <span className="font-semibold text-gray-900">{ethReceived} ETH</span>
          </p>
        </div>
        {/* Compact profit display */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Profit</p>
            <p className="text-2xl font-bold text-emerald-600">+{totalProfit.toFixed(3)} ETH</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {sales.map((nft) => {
          const rarity = getRarity(nft.token_id);
          const profit = nft.price_eth * 0.2;
          
          return (
            <div 
              key={nft.token_id} 
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ 
                background: '#F5FBFD',
                boxShadow: '2px 2px 8px 2px rgba(0, 5, 48, 0.08)'
              }}
            >
              {/* Image container with badges - grayscale by default */}
              <div className="relative">
                <img
                  src={nft.image}
                  alt={`FomoNFT #${nft.token_id}`}
                  className="w-full aspect-square object-cover rounded-t-2xl filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300/000000/00FF87?text=F';
                  }}
                />
                {/* Rarity badge - TOP RIGHT - grayscale by default */}
                <div className="absolute top-2 right-2 bg-gray-200/80 group-hover:bg-opacity-100 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm transition-all duration-300">
                  <span className={`text-xs font-semibold text-gray-500 group-hover:${rarity.color.replace('text-', '')} transition-colors duration-300`} style={{ color: 'inherit' }}>
                    <span className="text-gray-500 group-hover:hidden">{rarity.name}</span>
                    <span className={`hidden group-hover:inline ${rarity.color}`}>{rarity.name}</span>
                  </span>
                </div>
                {/* Token ID badge - BOTTOM LEFT */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-bold text-gray-900">#{nft.token_id}</span>
                </div>
                {/* SOLD badge - CENTER */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800/80 text-white text-xs px-4 py-1.5 rounded-full opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                  SOLD
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
                    <p className="text-[10px] text-gray-500">Sold</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{nft.price_eth} ETH</p>
                    <p className="text-[10px] font-semibold text-emerald-600">+{profit.toFixed(3)} profit</p>
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
    </div>
  );
}

export default Sales;