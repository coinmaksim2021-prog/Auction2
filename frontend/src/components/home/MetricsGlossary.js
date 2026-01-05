import React from 'react';

function MetricsGlossary({ strategyState }) {
  const treasury = strategyState?.treasury || {};
  const activity = strategyState?.activity || {};

  const metrics = [
    {
      term: 'Treasury ETH',
      value: treasury.eth_balance?.toFixed(2) || '0.00',
      desc: 'Amount of ETH accumulated in strategy treasury. This is the fuel for future buybacks.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    },
    {
      term: 'NFTs Owned',
      value: strategyState?.nft_supply?.owned || '0',
      desc: 'Number of NFTs owned by the strategy. Purchased from market, ready for sale.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    },
    {
      term: 'Total Purchases',
      value: activity.total_purchases || '0',
      desc: 'Number of times strategy bought assets (NFTs or tokens) from the market.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    },
    {
      term: 'Total Spent',
      value: `${activity.total_spent?.toFixed(2) || '0.00'} ETH`,
      desc: 'Amount of ETH spent on all buyback operations since launch.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    },
    {
      term: 'Burned',
      value: activity.total_burned?.toLocaleString() || '0',
      desc: 'Number of tokens permanently removed from circulation. Cannot be recovered.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    },
    {
      term: 'Token in LP',
      value: `${strategyState?.liquidity?.lp_locked_percent?.toFixed(1) || '0.0'}%`,
      desc: 'Percentage of tokens locked in liquidity pools to deepen the market and reduce volatility.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    },
    {
      term: 'NFTs to Floor',
      value: '0',
      desc: 'Number of NFTs between current price and floor price. Shows market depth - higher means harder to reach floor.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    },
    {
      term: 'Price Gap',
      value: `${((strategyState?.market?.strategy_floor_eth - strategyState?.market?.floor_price_eth) * 100).toFixed(1) || '0.0'}%`,
      desc: 'Difference between current price and floor in percent. Lower gap means healthier, more stable market.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">What Metrics Show</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Key indicators explained
        </p>

        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="card bg-white flex-shrink-0"
                  style={{ width: '280px' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {metric.icon}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{metric.term}</h3>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <div className="text-xs text-gray-500">← Scroll to see all metrics →</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetricsGlossary;
