import React from 'react';

const CollectionOverview = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Collection Overview
      </h3>
      
      <div className="space-y-3">
        <OverviewItem label="Pre-Mint BOX" value="666" />
        <OverviewItem label="Main Collection" value="4,444" />
        <OverviewItem 
          label="Total Supply" 
          value="4,777" 
          sublabel="incl. +333 from Box Fusion" 
          highlight 
        />
      </div>
    </div>
  );
};

const OverviewItem = ({ label, value, sublabel, highlight }) => (
  <div className={`flex items-center justify-between p-3 rounded-xl ${highlight ? 'bg-gray-100' : 'bg-gray-50'}`}>
    <div>
      <p className={`text-sm ${highlight ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{label}</p>
      {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
    </div>
    <p className={`text-lg font-bold ${highlight ? 'text-gray-900' : 'text-gray-700'}`}>{value}</p>
  </div>
);

export default CollectionOverview;
