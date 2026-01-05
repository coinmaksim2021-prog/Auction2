import React from 'react';

const PlaceBidPanel = ({ currentBid, totalBids, participants, onPlaceBid }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Place Your Bid</h3>
      
      <div className="space-y-4">
        {/* Current Bid */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Current Highest Bid</p>
          <p className="text-2xl font-bold text-gray-900">{currentBid} USDC</p>
        </div>
        
        {/* Minimum Bid */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <p className="text-xs text-emerald-600 font-medium">Minimum Bid: 100 USDC</p>
        </div>
        
        {/* Place Bid Button */}
        <button 
          onClick={onPlaceBid}
          className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl"
          data-testid="place-bid-btn"
        >
          Place Bid
        </button>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{totalBids}</p>
            <p className="text-xs text-gray-600">Total Bids</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{participants}</p>
            <p className="text-xs text-gray-600">Participants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceBidPanel;
