import React, { useState } from 'react';

function ChartSection({ strategyState }) {
  const [activeTab, setActiveTab] = useState('price'); // 'price' or 'mcap'
  
  // GeckoTerminal embed URL
  // Формат: https://www.geckoterminal.com/{network}/pools/{pool_address}?embed=1&info=0&swaps=0
  // Можно заменить на реальный адрес пула вашего токена
  // Примеры популярных пулов для демонстрации:
  // Ethereum WETH/USDC: 0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640
  // Можно использовать любой пул с GeckoTerminal
  
  const POOL_ADDRESS = '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640'; // WETH/USDC на Uniswap V3
  const NETWORK = 'eth';
  
  const embedUrl = `https://www.geckoterminal.com/${NETWORK}/pools/${POOL_ADDRESS}?embed=1&info=0&swaps=0&chart_type=price`;

  if (!strategyState) return null;

  const market = strategyState?.market || {};

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">F Token Price</h2>
          
          {/* Price/MCAP Toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('price')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeTab === 'price' 
                  ? 'text-gray-900' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Price
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setActiveTab('mcap')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeTab === 'mcap' 
                  ? 'text-gray-900' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              MCAP
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="live-indicator">
            <span className="live-dot"></span>
            Live
          </span>
        </div>
      </div>

      {/* GeckoTerminal Chart Embed */}
      <div 
        className="bg-gray-900 rounded-xl overflow-hidden border border-gray-200" 
        style={{ height: '400px' }}
        data-testid="gecko-terminal-chart"
      >
        <iframe
          src={embedUrl}
          title="GeckoTerminal Chart"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="clipboard-write"
          allowFullScreen
          style={{
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Quick Price Info */}
      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500 mb-1">Price</p>
          <p className="text-sm font-semibold text-gray-900">
            ${(market.token_price_usd || 0.000042).toFixed(6)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">24h Change</p>
          <p className={`text-sm font-semibold ${
            (market.price_change_24h || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {(market.price_change_24h || 0) >= 0 ? '+' : ''}{(market.price_change_24h || 12.5).toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Volume 24h</p>
          <p className="text-sm font-semibold text-gray-900">
            ${((market.volume_24h_usd || 2400) / 1000).toFixed(1)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Market Cap</p>
          <p className="text-sm font-semibold text-gray-900">
            ${((market.market_cap_usd || 145000) / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Powered by GeckoTerminal */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-end">
        <a 
          href="https://www.geckoterminal.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          Powered by GeckoTerminal
        </a>
      </div>
    </div>
  );
}

export default ChartSection;
