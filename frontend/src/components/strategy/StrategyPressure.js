import React from 'react';

/**
 * Strategy pressure indicator component
 * @param {Object} props
 * @param {number} props.pressure - Strategy pressure value (0-100)
 * @param {number} props.nftsToFloor - NFTs to floor count
 * @param {number} props.priceGap - Price gap percentage
 */
function StrategyPressure({ pressure, nftsToFloor, priceGap }) {
  const getPressureColor = (value) => {
    if (value >= 70) return 'text-emerald-600';
    if (value >= 40) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getBarColor = (value) => {
    if (value >= 70) return 'bg-emerald-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs font-medium text-gray-700">Strategy Pressure</span>
        </div>
        <span className={`text-sm font-bold ${getPressureColor(pressure)}`}>{pressure}/100</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${getBarColor(pressure)}`}
          style={{ width: `${pressure}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>NFTs to Floor: <b className="text-gray-700">{nftsToFloor}</b></span>
        <span>Gap: <b className="text-gray-700">{priceGap.toFixed(1)}%</b></span>
      </div>
    </div>
  );
}

export default StrategyPressure;
