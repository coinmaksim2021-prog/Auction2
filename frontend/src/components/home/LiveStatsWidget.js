import React from 'react';

function LiveStatsWidget({ strategyState }) {
  if (!strategyState) return null;

  const treasury = strategyState?.treasury || {};
  const activity = strategyState?.activity || {};

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-8 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-0.5">Live Strategy Stats</h2>
                <p className="text-sm text-gray-500">Real-time data from the blockchain</p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-600">LIVE</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Treasury ETH */}
            <div className="p-8 text-center group hover:bg-gray-50 transition-all">
              <span className="text-sm font-medium text-gray-600 mb-3 block">Treasury ETH</span>
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform">
                {treasury.eth_balance?.toFixed(2) || '0.00'}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-600">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Live</span>
              </div>
            </div>

            {/* Tokens Burned */}
            <div className="p-8 text-center group hover:bg-gray-50 transition-all">
              <span className="text-sm font-medium text-gray-600 mb-3 block">Tokens Burned</span>
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform">
                {activity.total_burned?.toLocaleString() || '0'}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <span className="font-medium">Total</span>
              </div>
            </div>

            {/* Last Buyback */}
            <div className="p-8 text-center group hover:bg-gray-50 transition-all">
              <span className="text-sm font-medium text-gray-600 mb-3 block">Last Buyback</span>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-105 transition-transform">
                {activity?.last_purchase_time 
                  ? new Date(activity.last_purchase_time * 1000).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })
                  : 'No data'}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {activity?.last_purchase_time 
                  ? new Date(activity.last_purchase_time * 1000).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })
                  : ''}
              </div>
              {activity?.last_tx_hash && (
                <a 
                  href={`https://etherscan.io/tx/${activity.last_tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>View TX</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-600 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LiveStatsWidget;
