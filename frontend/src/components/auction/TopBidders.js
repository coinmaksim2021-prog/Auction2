import React from 'react';

const topCategories = [
  { title: 'Azart Ranking', subtitle: 'Top 10', description: 'Highest number of bids & most original amounts', badge: 'hidden' },
  { title: 'Pattern Masters', subtitle: 'Top 10', description: 'Most unique bid patterns discovered', badge: 'hidden' },
  { title: 'Early Birds', subtitle: 'First 6h', description: 'Participated within first 6 hours', badge: 'og' }
];

const TopBidders = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        Top Bidders
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-auto">Hidden Rankings</span>
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {topCategories.map((category, i) => (
          <div key={i} className="group relative">
            <div className={`px-3 py-2 rounded-full border text-sm font-medium cursor-help transition-all
              ${category.badge === 'og' 
                ? 'bg-purple-50 border-purple-200 text-purple-700' 
                : 'bg-gray-50 border-gray-200 text-gray-700'}`}
            >
              {category.title}
              <span className="ml-1 text-xs opacity-60">{category.subtitle}</span>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {category.description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-700 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Rankings are secret. Compete for mystery rewards!
        </p>
      </div>
    </div>
  );
};

export default TopBidders;
