import React from 'react';

/**
 * Flow steps component showing the fee collection process
 * @param {Object} props
 * @param {number} props.treasuryValue - Treasury ETH value
 * @param {number} props.burnedTokens - Amount of burned tokens
 * @param {number} props.liquidityValue - Liquidity ETH value
 */
function FlowSteps({ treasuryValue, burnedTokens, liquidityValue }) {
  return (
    <div className="space-y-2">
      {/* Step 1: Fee */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">10% Fee on Trades</p>
          <p className="text-xs text-gray-500">Every transaction contributes</p>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Step 2: Treasury */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Treasury Accumulation</p>
          <p className="text-xs text-gray-500">Funds ready: <span className="font-bold text-gray-700">{treasuryValue.toFixed(2)} ETH</span></p>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Step 3: Actions */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-gray-900">Burn</p>
            <p className="text-xs text-orange-500 font-bold">
              {burnedTokens >= 1000000 ? `${(burnedTokens / 1000000).toFixed(1)}M` : burnedTokens.toLocaleString()} F
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-gray-900">Liquidity</p>
            <p className="text-xs text-emerald-500 font-bold">{liquidityValue.toFixed(1)} ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowSteps;
