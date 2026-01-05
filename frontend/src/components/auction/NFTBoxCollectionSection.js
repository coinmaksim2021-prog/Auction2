import React from 'react';

const NFTBoxCollectionSection = () => {
  const nftBoxes = [
    { token_id: 124, price_eth: 1.12, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 135, price_eth: 1.22, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 156, price_eth: 1.18, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 201, price_eth: 2.45, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 89, price_eth: 1.35, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 312, price_eth: 0.95, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 7, price_eth: 3.20, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 456, price_eth: 1.50, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 523, price_eth: 0.88, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' },
    { token_id: 67, price_eth: 1.75, image: 'https://placehold.co/300x300/10b981/ffffff?text=F' }
  ];

  const getRarity = (tokenId) => {
    const rarities = [
      { name: 'Common', color: 'text-gray-600', bg: 'bg-gray-100' },
      { name: 'Uncommon', color: 'text-green-600', bg: 'bg-green-50' },
      { name: 'Rare', color: 'text-blue-600', bg: 'bg-blue-50' },
      { name: 'Epic', color: 'text-purple-600', bg: 'bg-purple-50' },
      { name: 'Legendary', color: 'text-orange-600', bg: 'bg-orange-50' }
    ];
    const index = tokenId % 100 < 5 ? 4 : tokenId % 100 < 15 ? 3 : tokenId % 100 < 35 ? 2 : tokenId % 100 < 60 ? 1 : 0;
    return rarities[index];
  };

  return (
    <section className="mt-12 mb-12 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Pre-Mint BOX Collection</h2>
          <p className="text-gray-600 mb-2">666 Exclusive NFT Boxes • Available for Trading & Fusion</p>
          <p className="text-sm text-gray-500">Previous collection now available on the open market</p>
        </div>

        <div className="relative overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 px-2">
            {nftBoxes.map((nft) => {
              const rarity = getRarity(nft.token_id);
              return (
                <div 
                  key={nft.token_id}
                  className="flex-shrink-0 w-48 group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    background: '#F5FBFD',
                    boxShadow: '2px 2px 8px 2px rgba(0, 5, 48, 0.08)'
                  }}
                >
                  <div className="relative">
                    <img
                      src={nft.image}
                      alt={`NFT Box #${nft.token_id}`}
                      className="w-full aspect-square object-cover rounded-t-2xl"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/000000/00FF87?text=F';
                      }}
                    />
                    <div className={`absolute top-2 right-2 ${rarity.bg} backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm`}>
                      <span className={`text-xs font-semibold ${rarity.color}`}>{rarity.name}</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                      <span className="text-xs font-bold text-gray-900">#{nft.token_id}</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">F</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">NFT Box</p>
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
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-3">
            These boxes can be fused together to mint NFTs from the main collection
          </p>
          <a 
            href="https://www.fomo.cx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all shadow-lg"
          >
            View Full Collection
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NFTBoxCollectionSection;
