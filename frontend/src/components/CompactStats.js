import React, { useState, useEffect } from 'react';

function CompactStats({ strategyState }) {
  const [animatedBurned, setAnimatedBurned] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const treasury = strategyState?.treasury || {};
  const nftSupply = strategyState?.nft_supply || {};
  const activity = strategyState?.activity || {};
  const market = strategyState?.market || {};
  const liquidity = strategyState?.liquidity || {};

  const currentETH = treasury.eth_balance || 0;
  const targetETH = market.floor_price_eth || 0.01;
  const progress = Math.min(100, (currentETH / targetETH) * 100);
  const burned = nftSupply.burned || 0;
  const totalMinted = nftSupply.total_minted || 1;
  const burnPercent = ((burned / totalMinted) * 100) || 0;

  // New stats
  const tokenInLP = liquidity.lp_locked_percent || 10.24;
  const nftsBetween = 0;
  const strategyFloor = market.strategy_floor_eth || 0.078;
  const marketFloor = market.floor_price_eth || 0.079;
  const pricePremium = strategyFloor - marketFloor;

  // Calculate Strategy Pressure Index (SPI)
  const ethNeededToFloor = targetETH || 0.01;
  const spi = ethNeededToFloor > 0 ? (currentETH / ethNeededToFloor) : 0;
  const spiStatus = spi >= 1.0 ? 'Strong' : spi >= 0.5 ? 'Medium' : spi > 0 ? 'Weak' : 'None';
  const spiColor = spi >= 1.0 ? 'text-emerald-600' : spi >= 0.5 ? 'text-yellow-600' : 'text-gray-400';
  
  // Calculate next thresholds for SPI
  const spiToMedium = spi >= 1.0 ? (0.5 * ethNeededToFloor) : null;
  const spiToWeak = spi >= 0.5 ? (0.5 * ethNeededToFloor) : null;
  const spiToStrong = spi < 1.0 ? ((1.0 - spi) * ethNeededToFloor) : null;
  
  // Calculate Price Gap percentage
  const avgStrategyPrice = market.strategy_avg_buy_price || 0.079;
  const priceGapPercent = marketFloor > 0 ? ((pricePremium / marketFloor) * 100) : 0;
  const priceGapColor = pricePremium < 0 ? 'text-emerald-600' : pricePremium === 0 ? 'text-gray-400' : 'text-red-600';
  
  // Next purchase target
  const ethNeededForNext = Math.max(0, targetETH - currentETH);
  const purchaseProgress = (currentETH / targetETH) * 100;

  // Animate burned count
  useEffect(() => {
    if (!strategyState) return;
    let start = 0;
    const end = burned;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedBurned(end);
        clearInterval(timer);
      } else {
        setAnimatedBurned(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [burned, strategyState]);

  // Animate progress
  useEffect(() => {
    if (!strategyState) return;
    let start = 0;
    const end = progress;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedProgress(end);
        clearInterval(timer);
      } else {
        setAnimatedProgress(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [progress, strategyState]);

  if (!strategyState) return null;

  return (
    <div className="space-y-4">
      {/* Next NFT Purchase - Full Width */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden" data-testid="next-nft-purchase">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 via-transparent to-teal-50/50 animate-gradient-shift"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Next NFT Purchase</p>
                <p className="text-xs text-gray-500">Auto-buy when target reached</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {progress >= 100 && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">{animatedProgress.toFixed(0)}%</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="absolute inset-0 progress-stripes opacity-10"></div>
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${animatedProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation"></div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600 font-medium">{currentETH.toFixed(4)} ETH collected</span>
            <span className="text-gray-500">Target: <span className="font-semibold text-gray-900">{targetETH.toFixed(4)} ETH</span></span>
          </div>
        </div>
      </div>

      {/* Token Burn Status - Full Width */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden" data-testid="token-burn-status">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-28">
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="burnGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#ea580c" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="burnGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,100 Q50,60 100,70 T200,50 T300,65 T400,55 L400,100 Z" fill="url(#burnGradient1)" className="flame-path-1" />
              <path d="M0,100 Q30,75 80,80 T180,60 T280,75 T400,65 L400,100 Z" fill="url(#burnGradient2)" className="flame-path-2" />
            </svg>
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-orange-400 rounded-full ember-particle" style={{ left: `${12 + i * 15}%`, bottom: '15%', animationDelay: `${i * 0.25}s` }} />
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 animate-pulse-slow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Token Burn Status</h4>
                <p className="text-xs text-gray-500">Tokens removed forever</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg border border-orange-100">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-orange-700 font-semibold">Burning</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-gray-900 mb-1">{animatedBurned.toLocaleString()}</div>
              <p className="text-xs text-gray-500 font-medium">Burned</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-gray-900 mb-1">{burnPercent.toFixed(1)}%</div>
              <p className="text-xs text-gray-500 font-medium">of Supply</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-gray-900 mb-1">{(totalMinted - burned).toLocaleString()}</div>
              <p className="text-xs text-gray-500 font-medium">Remaining</p>
            </div>
          </div>

          {/* Burn Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Burn Progress</span>
              <span className="font-semibold text-orange-600">{burnPercent.toFixed(2)}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 rounded-full transition-all duration-1000" style={{ width: `${burnPercent}%` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-animation"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
            <span className="text-gray-500">Total Supply: <span className="font-semibold text-gray-900">{totalMinted.toLocaleString()}</span></span>
            <div className="flex items-center gap-1 text-orange-600">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Deflationary</span>
            </div>
          </div>
        </div>
      </div>

      {/* First Stats Row - 4 Cards */}
      <div className="grid grid-cols-4 gap-3">
        {/* % Token in LP */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all relative group">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-gray-500 font-medium">% Token in LP</span>
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-0 mb-2 w-56 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">Token Liquidity</p>
              <p className="mb-2">Percentage of tokens currently in liquidity pool</p>
              <div className="text-emerald-300 text-xs border-t border-gray-700 pt-2">
                <p>Current: {tokenInLP.toFixed(2)}%</p>
                <p>Locked Value: ${(tokenInLP * 10000).toFixed(0)}</p>
              </div>
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900">{tokenInLP.toFixed(2)}%</p>
          <p className="text-xs text-gray-400 mt-1">Liquidity Pool</p>
        </div>

        {/* NFTs to Floor */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all relative group">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="text-xs text-gray-500 font-medium">NFTs to Floor</span>
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-0 mb-2 w-56 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">NFTs to Floor Price</p>
              <p className="mb-2">Number of NFTs needed to be bought to reach floor price</p>
              {nftsBetween === 0 ? (
                <div className="text-orange-300 text-xs border-t border-gray-700 pt-2">
                  <p>🔥 Strong signal! Strategy at floor</p>
                  <p>Ready for immediate action</p>
                </div>
              ) : (
                <div className="text-yellow-300 text-xs border-t border-gray-700 pt-2">
                  <p>NFTs needed: {nftsBetween}</p>
                  <p>Est. ETH: {(nftsBetween * marketFloor).toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
          <p className={`text-xl font-bold ${nftsBetween === 0 ? 'text-orange-500' : 'text-gray-900'}`}>
            {nftsBetween}
          </p>
          <p className="text-xs text-gray-400 mt-1">Market vs Strategy</p>
        </div>

        {/* Price Gap */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all relative group">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs text-gray-500 font-medium">Price Gap</span>
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-0 mb-2 w-60 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">Price Gap (Floor - Avg Strategy)</p>
              <p className="mb-2">Difference between market floor and strategy average buy price</p>
              <div className="border-t border-gray-700 pt-2 space-y-1">
                <p>Floor Price: {marketFloor.toFixed(3)} ETH</p>
                <p>Avg Buy: {avgStrategyPrice.toFixed(3)} ETH</p>
                <p className={priceGapPercent < 0 ? 'text-emerald-300' : 'text-red-300'}>
                  Gap: {pricePremium >= 0 ? '+' : ''}{pricePremium.toFixed(5)} ETH ({priceGapPercent >= 0 ? '+' : ''}{priceGapPercent.toFixed(1)}%)
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {priceGapPercent < 0 ? '🟢 Strategy bought cheaper' : priceGapPercent === 0 ? '⚪ At parity' : '🔴 Market overheated'}
                </p>
              </div>
            </div>
          </div>
          <p className={`text-xl font-bold ${priceGapColor}`}>
            {pricePremium >= 0 ? '+' : ''}{pricePremium.toFixed(5)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {priceGapPercent >= 0 ? '+' : ''}{priceGapPercent.toFixed(1)}%
          </p>
        </div>

        {/* Strategy Pressure Index (SPI) */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all relative group">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs text-gray-500 font-medium">Strategy Pressure</span>
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">Strategy Pressure Index (SPI)</p>
              <p className="mb-2">Shows if strategy has enough funds to buy NFTs down to floor price</p>
              <div className="border-t border-gray-700 pt-2 space-y-1">
                <p>Formula: Treasury ETH / ETH to Floor</p>
                <p>Current: {spi.toFixed(2)}</p>
                <p className={spiColor}>Status: {spiStatus}</p>
              </div>
              <div className="mt-2 border-t border-gray-700 pt-2 text-xs">
                <p className="text-gray-400 mb-1">Thresholds:</p>
                {spi >= 1.0 && spiToMedium && (
                  <p className="text-yellow-300">Need -{spiToMedium.toFixed(2)} ETH to drop to Medium</p>
                )}
                {spi >= 0.5 && spi < 1.0 && spiToWeak && (
                  <p className="text-gray-300">Need -{spiToWeak.toFixed(2)} ETH to drop to Weak</p>
                )}
                {spi < 1.0 && spiToStrong && (
                  <p className="text-emerald-300">Need +{spiToStrong.toFixed(2)} ETH for Strong</p>
                )}
              </div>
            </div>
          </div>
          <p className={`text-xl font-bold ${spiColor}`}>{spi.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">{spiStatus}</p>
        </div>
      </div>

      {/* Second Stats Row - 4 Cards */}
      <div className="grid grid-cols-4 gap-3">
        {/* Treasury ETH */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-all relative group">
          <div className="absolute top-2 right-2">
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">Treasury ETH Balance</p>
              <p className="mb-2">Total ETH available for NFT buybacks</p>
              <div className="border-t border-gray-700 pt-2">
                <p>Current: {currentETH.toFixed(4)} ETH</p>
                <p>Target: {targetETH.toFixed(4)} ETH</p>
                <p className="text-emerald-300 mt-1">
                  {ethNeededForNext > 0 ? `Need +${ethNeededForNext.toFixed(4)} ETH for next purchase` : '✓ Ready to buy'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 mb-2 flex justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-lg font-bold text-gray-900 mb-1">{currentETH.toFixed(4)}</p>
          <p className="text-xs text-gray-500">Treasury ETH</p>
        </div>

        {/* NFTs Owned */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-all relative group">
          <div className="absolute top-2 right-2">
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">NFTs Owned by Strategy</p>
              <p className="mb-2">Total NFTs currently controlled by the strategy</p>
              <div className="border-t border-gray-700 pt-2">
                <p>Owned: {nftSupply.strategy_owned || 0} NFTs</p>
                <p>Total Supply: {totalMinted} NFTs</p>
                <p className="text-blue-300 mt-1">
                  {((nftSupply.strategy_owned / totalMinted) * 100).toFixed(1)}% of supply
                </p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 mb-2 flex justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg font-bold text-gray-900 mb-1">{nftSupply.strategy_owned || 0}</p>
          <p className="text-xs text-gray-500">NFTs Owned</p>
        </div>

        {/* Total Purchases */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-all relative group">
          <div className="absolute top-2 right-2">
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">Total Purchases</p>
              <p className="mb-2">Total number of NFTs bought by strategy</p>
              <div className="border-t border-gray-700 pt-2">
                <p>Total Bought: {activity.nft_bought_total || 0}</p>
                <p>Total Sold: {activity.nft_sold_total || 0}</p>
                <p className="text-purple-300 mt-1">
                  Net Position: {(activity.nft_bought_total || 0) - (activity.nft_sold_total || 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 mb-2 flex justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-lg font-bold text-gray-900 mb-1">{activity.nft_bought_total || 0}</p>
          <p className="text-xs text-gray-500">Total Purchases</p>
        </div>

        {/* Total Spent ETH */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-all relative group">
          <div className="absolute top-2 right-2">
            <svg className="w-3.5 h-3.5 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-black/85 backdrop-blur-md text-white text-xs rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-2xl border border-white/10">
              <p className="font-semibold mb-1">Total Spent ETH</p>
              <p className="mb-2">Total ETH spent on all buybacks</p>
              <div className="border-t border-gray-700 pt-2">
                <p>Spent: {(activity.eth_spent_on_buybacks || 0).toFixed(3)} ETH</p>
                <p>Earned: {(activity.eth_received_from_sales || 0).toFixed(3)} ETH</p>
                <p className={`mt-1 ${((activity.eth_received_from_sales || 0) - (activity.eth_spent_on_buybacks || 0)) >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                  Net: {(((activity.eth_received_from_sales || 0) - (activity.eth_spent_on_buybacks || 0)) >= 0 ? '+' : '')}{((activity.eth_received_from_sales || 0) - (activity.eth_spent_on_buybacks || 0)).toFixed(3)} ETH
                </p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 mb-2 flex justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg font-bold text-gray-900 mb-1">{(activity.eth_spent_on_buybacks || 0).toFixed(3)}</p>
          <p className="text-xs text-gray-500">Total Spent ETH</p>
        </div>
      </div>
    </div>
  );
}

export default CompactStats;
