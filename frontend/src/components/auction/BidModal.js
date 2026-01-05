import React from 'react';

const BidModal = ({ bidAmount, setBidAmount, onClose, onConfirm }) => {
  const quickBids = [
    { amount: '100', label: 'Minimum bid' },
    { amount: '200', label: '+5% Rarity Boost', highlight: true },
    { amount: '300', label: '+10% Rarity Boost', highlight: true },
    { amount: '500', label: '+20% Rarity + Early Bird', highlight: true }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Place Your Bid</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bid Amount (USDC)</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
            <div className="grid grid-cols-2 gap-3">
              {quickBids.map((quick, i) => (
                <button
                  key={i}
                  onClick={() => setBidAmount(quick.amount)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    bidAmount === quick.amount 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{quick.amount} USDC</p>
                  <p className={`text-xs ${quick.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {quick.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600">
              Higher bids increase your chances for rare NFTs. Unique bid amounts give additional bonus.
            </p>
          </div>
          
          <button 
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all shadow-lg"
            onClick={onConfirm}
          >
            Confirm Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidModal;
