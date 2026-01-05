import React, { useState } from 'react';
import { DonutChart, FlowSteps, StrategyPressure } from './strategy';

function StrategyValueFlow({ strategyState }) {
  const [activeSegment, setActiveSegment] = useState(null);

  // Get real data from strategy state
  const activity = strategyState?.activity || {};
  const treasury = strategyState?.treasury || {};
  const market = strategyState?.market || {};

  const burnedValue = activity.total_burned_eth || 34.2;
  const liquidityValue = treasury.lp_balance || 42.0;
  const treasuryValue = treasury.eth_balance || 24.7;
  const totalValue = burnedValue + liquidityValue + treasuryValue;

  // Market metrics
  const nftsToFloor = market.nfts_to_floor || 12;
  const priceGap = market.price_gap_percent || 8.5;

  // Segments data - gray for Treasury
  const burnedTokens = burnedValue * 1000000; // Convert to actual token amount
  const segments = [
    { 
      name: 'Burned', 
      value: burnedValue,
      displayValue: burnedTokens >= 1000000 ? `${(burnedTokens / 1000000).toFixed(1)}M` : burnedTokens.toLocaleString(),
      unit: 'F',
      percent: (burnedValue / totalValue) * 100, 
      color: '#f97316',
      desc: 'Tokens burned'
    },
    { 
      name: 'Liquidity', 
      value: liquidityValue,
      displayValue: liquidityValue.toFixed(1),
      unit: 'ETH',
      percent: (liquidityValue / totalValue) * 100, 
      color: '#10b981',
      desc: 'Supporting price floor'
    },
    { 
      name: 'Treasury', 
      value: treasuryValue,
      displayValue: treasuryValue.toFixed(1),
      unit: 'ETH',
      percent: (treasuryValue / totalValue) * 100, 
      color: '#6b7280',
      desc: 'Ready for buybacks'
    }
  ];

  // Strategy Pressure calculation
  const strategyPressure = Math.min(100, Math.round(
    (treasuryValue / (market.floor_price_eth || 1.24)) * 10 + (100 - nftsToFloor * 3)
  ));

  return (
    <div className="card animate-fade-in">
      {/* Header - Compact */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Strategy Value Flow</h3>
          <p className="text-sm text-gray-500">Real-time distribution</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-emerald-600">LIVE</span>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex gap-8">
        {/* Left: Donut Chart */}
        <DonutChart 
          segments={segments} 
          activeSegment={activeSegment} 
          setActiveSegment={setActiveSegment} 
        />

        {/* Right: Flow + Metrics */}
        <div className="flex-1 space-y-4">
          <FlowSteps 
            treasuryValue={treasuryValue}
            burnedTokens={burnedTokens}
            liquidityValue={liquidityValue}
          />
          <StrategyPressure 
            pressure={strategyPressure}
            nftsToFloor={nftsToFloor}
            priceGap={priceGap}
          />
        </div>
      </div>
    </div>
  );
}

export default StrategyValueFlow;
