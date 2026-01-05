import React from 'react';
import { getRarity } from '../utils/nftUtils';

function FloorNFT({ strategyState }) {
  if (!strategyState) return null;

  const market = strategyState?.market || {};
  const floorPrice = market.floor_price_eth || 1.240;
  
  // Get the cheapest NFT from the strategy state
  const nfts = strategyState?.nfts || [];
  const cheapestNFT = nfts.length > 0 
    ? {
        id: nfts[0].token_id,
        image: nfts[0].image || 'https://images.unsplash.com/photo-1764437358350-e324534072d7?w=400',
        price: nfts[0].price_eth,
        owner: '0x7a23...4f2d'
      }
    : {
        id: 3941,
        image: 'https://images.unsplash.com/photo-1764437358350-e324534072d7?w=400',
        price: floorPrice,
        owner: '0x7a23...4f2d'
      };

  const rarity = getRarity(cheapestNFT.id);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900">Floor NFT</h4>
        <a href="https://www.fomo.cx" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600">
          View →
        </a>
      </div>
      
      {/* NFT Display with badges */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 mb-4 relative">
        <img 
          src={cheapestNFT.image} 
          alt={`#${cheapestNFT.id}`} 
          className="w-full h-full object-cover" 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/16c784?text=NFT'; }} 
        />
        {/* Rarity badge - TOP RIGHT */}
        <div className={`absolute top-3 right-3 ${rarity.bg} backdrop-blur-sm px-3 py-1 rounded-full shadow-sm`}>
          <span className={`text-sm font-semibold ${rarity.color}`}>{rarity.name}</span>
        </div>
        {/* Token ID badge - BOTTOM LEFT */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-sm font-bold text-gray-900">#{cheapestNFT.id}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Floor Price</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
            </svg>
            <span className="text-lg font-bold text-gray-900">{floorPrice.toFixed(3)} ETH</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Listed</span>
          <span className="text-sm font-semibold text-gray-900">{market.listed_count || nfts.length || 47} NFTs</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Owner</span>
          <span className="text-sm text-gray-900 font-mono">{cheapestNFT.owner}</span>
        </div>
      </div>

      <a href="https://www.fomo.cx" target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-black transition-all flex items-center justify-center gap-2">
        Buy on FOMO.cx
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

export default FloorNFT;
