import React, { useState, useMemo } from 'react';

function StrategyCalculator({ strategyState }) {
  // Input states
  const [priceNow, setPriceNow] = useState(0.079);
  const [volumeLevel, setVolumeLevel] = useState('base'); // low, base, high
  const [timeHorizon, setTimeHorizon] = useState(30); // days
  const [feePercent, setFeePercent] = useState(10);
  const [impactStrength, setImpactStrength] = useState(0.5); // k = 0..1

  const nftSupply = strategyState?.nft_supply || {};
  const S0 = nftSupply.total_minted || 5000;
  const burnRate = 0.5; // 50% of bought NFTs go to burn

  // Volume estimates (ETH per day)
  const volumeEstimates = {
    low: 0.5,
    base: 2.0,
    high: 5.0
  };

  // Calculations
  const calculations = useMemo(() => {
    const dailyVolume = volumeEstimates[volumeLevel];
    const days = timeHorizon;
    const fee = feePercent / 100;
    const b = burnRate;
    const k = impactStrength;
    const P0 = priceNow;

    // Treasury receives over period
    const R = dailyVolume * days * fee;
    
    // Buyback budget (90% of treasury goes to buybacks)
    const B_nft = R * 0.9;
    
    // NFTs that can be bought
    const P_buy = P0; // buying at current floor
    const N_buy = Math.floor(B_nft / P_buy);
    
    // NFTs burned
    const N_burn = Math.floor(N_buy * b);
    
    // New supply
    const S1 = S0 - N_burn;
    
    // Supply reduction %
    const supplyReduction = ((S0 - S1) / S0) * 100;
    
    // Value per NFT
    const valuePerNFT = R / S0;
    const buybackPerNFT = B_nft / S0;
    
    // Price scenarios (with k factor)
    const P1_conservative = P0; // k=0
    const P1_base = P0 * Math.pow(S0 / S1, 0.5); // k=0.5
    const P1_aggressive = P0 * Math.pow(S0 / S1, 1); // k=1
    const P1_custom = P0 * Math.pow(S0 / S1, k);

    return {
      R,
      B_nft,
      N_buy,
      N_burn,
      S1,
      supplyReduction,
      valuePerNFT,
      buybackPerNFT,
      P1_conservative,
      P1_base,
      P1_aggressive,
      P1_custom
    };
  }, [priceNow, volumeLevel, timeHorizon, feePercent, impactStrength, S0]);

  if (!strategyState) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Strategy Calculator</h3>
          <p className="text-xs text-gray-500 mt-1">Simulate buyback & burn scenarios</p>
        </div>
        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
          Not financial advice
        </div>
      </div>

      {/* Animation Flow */}
      <div className="flex items-center justify-center gap-2 mb-6 py-3 bg-gradient-to-r from-blue-50 via-emerald-50 to-orange-50 rounded-xl">
        <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Trade
        </div>
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
          </svg>
          Treasury
        </div>
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <div className="flex items-center gap-1 text-xs font-medium text-purple-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
          </svg>
          Buyback
        </div>
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <div className="flex items-center gap-1 text-xs font-medium text-orange-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343" />
          </svg>
          Burn
        </div>
      </div>

      {/* Three Columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Column 1: Inputs */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-100">Inputs</h4>
          
          <div>
            <label className="text-xs text-gray-500 block mb-1">Price Now (ETH)</label>
            <input
              type="number"
              value={priceNow}
              onChange={(e) => setPriceNow(parseFloat(e.target.value) || 0)}
              step="0.001"
              min="0"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Volume/Day</label>
            <div className="grid grid-cols-3 gap-1">
              {['low', 'base', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setVolumeLevel(level)}
                  className={`px-2 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    volumeLevel === level
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">{volumeEstimates[volumeLevel]} ETH/day</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Time Horizon (days)</label>
            <input
              type="number"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(parseInt(e.target.value) || 1)}
              min="1"
              max="365"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Fee: {feePercent}%</label>
            <input
              type="range"
              value={feePercent}
              onChange={(e) => setFeePercent(parseInt(e.target.value))}
              min="1"
              max="20"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Column 2: What Happens */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-100">What Happens</h4>
          
          <div className="bg-emerald-50 rounded-lg p-3">
            <p className="text-xs text-emerald-600 mb-1">Treasury Receives</p>
            <p className="text-xl font-bold text-emerald-700">{calculations.R.toFixed(3)} ETH</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-xs text-purple-600 mb-1">Buyback Budget</p>
            <p className="text-xl font-bold text-purple-700">{calculations.B_nft.toFixed(3)} ETH</p>
          </div>

          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-xs text-orange-600 mb-1">NFTs Burned</p>
            <p className="text-xl font-bold text-orange-700">{calculations.N_burn}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Supply After</p>
            <p className="text-xl font-bold text-gray-900">{calculations.S1.toLocaleString()}</p>
          </div>
        </div>

        {/* Column 3: So What For You */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-100">So What For You</h4>
          
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-600 mb-1">Supply Reduction</p>
            <p className="text-xl font-bold text-blue-700">↓ {calculations.supplyReduction.toFixed(2)}%</p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-3">
            <p className="text-xs text-indigo-600 mb-1">Value per NFT</p>
            <p className="text-xl font-bold text-indigo-700">{calculations.valuePerNFT.toFixed(5)} ETH</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">Price Impact (k={impactStrength})</p>
            </div>
            <input
              type="range"
              value={impactStrength}
              onChange={(e) => setImpactStrength(parseFloat(e.target.value))}
              min="0"
              max="1"
              step="0.1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
            />
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="bg-gray-100 rounded p-1.5">
                <p className="text-xs text-gray-500">Conservative</p>
                <p className="text-sm font-semibold text-gray-700">{calculations.P1_conservative.toFixed(3)}</p>
              </div>
              <div className="bg-emerald-100 rounded p-1.5">
                <p className="text-xs text-emerald-600">Base</p>
                <p className="text-sm font-semibold text-emerald-700">{calculations.P1_base.toFixed(3)}</p>
              </div>
              <div className="bg-orange-100 rounded p-1.5">
                <p className="text-xs text-orange-600">Aggressive</p>
                <p className="text-sm font-semibold text-orange-700">{calculations.P1_aggressive.toFixed(3)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          Higher volume → more revenue → more buybacks → more burn → less supply.
          <span className="block mt-1 text-gray-500 font-medium">These are scenarios, not guarantees.</span>
        </p>
      </div>
    </div>
  );
}

export default StrategyCalculator;
