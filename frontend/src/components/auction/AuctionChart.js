import React from 'react';

const AuctionChart = ({ ogTrailblazers, totalBids, participants }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Live Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-200">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-red-600">LIVE AUCTION</span>
          </div>
          
          {/* OG Trailblazer */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-200">
            <span className="text-xs font-semibold text-purple-600">OG TRAILBLAZER</span>
            <span className="text-sm font-bold text-purple-700">{ogTrailblazers}/100</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span><span className="font-bold text-emerald-600 tabular-nums">{totalBids}</span> total bids</span>
          <span><span className="font-bold text-emerald-600 tabular-nums">{participants}</span> participants</span>
        </div>
      </div>
      
      {/* Chart Header with Legend */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900">Auction Activity</h4>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Avg. Bid Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-orange-500 rounded-full" style={{ background: 'linear-gradient(90deg, #f97316 0%, #fb923c 100%)' }}></div>
            <span className="text-xs text-gray-600">Time Remaining</span>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="relative h-80">
        {/* Left Y-axis labels (Price) */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
          <span className="text-emerald-600 font-medium">$1000</span>
          <span>$750</span>
          <span>$500</span>
          <span>$250</span>
          <span>$0</span>
        </div>
        
        {/* Right Y-axis labels (Time) */}
        <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500 text-right">
          <span className="text-orange-600 font-medium">72h</span>
          <span>54h</span>
          <span>36h</span>
          <span>18h</span>
          <span>0h</span>
        </div>
            
        {/* Chart area */}
        <div className="ml-12 mr-12 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 25, 50, 75, 100].map((pos) => (
              <div key={pos} className="absolute w-full border-t border-gray-200" style={{ top: `${pos}%` }}></div>
            ))}
          </div>
          
          {/* Dual Line chart */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 320" preserveAspectRatio="none">
            {/* Price line (green, rising) */}
            <polyline
              points="0,300 100,270 200,230 300,185 400,150 500,115 600,85 700,60 800,40"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="0,300 100,270 200,230 300,185 400,150 500,115 600,85 700,60 800,40 800,320 0,320"
              fill="url(#priceGradient)"
              fillOpacity="0.15"
            />
            
            {/* Time decay line (orange, falling) */}
            <polyline
              points="0,40 100,75 200,115 300,155 400,195 500,235 600,265 700,290 800,305"
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8,4"
            />
            <polyline
              points="0,40 100,75 200,115 300,155 400,195 500,235 600,265 700,290 800,305 800,320 0,320"
              fill="url(#timeGradient)"
              fillOpacity="0.1"
            />
            
            {/* Current position indicators */}
            <circle cx="800" cy="40" r="6" fill="#10b981" stroke="white" strokeWidth="2" />
            <circle cx="800" cy="305" r="6" fill="#f97316" stroke="white" strokeWidth="2" />
            
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="timeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0"/>
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
            
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-12 right-12 flex justify-between text-xs text-gray-500 -mb-6">
          <span>72h ago</span>
          <span>48h ago</span>
          <span>24h ago</span>
          <span className="font-medium text-gray-700">Now</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-8">As time decreases, bid competition increases — driving average prices higher</p>
    </div>
  );
};

export default AuctionChart;
