import React from 'react';

const groups = [
  {
    title: "If you're a Holder",
    subtitle: 'Watch long-term health metrics',
    items: ['Treasury ETH — is treasury growing', 'Total Burned — is supply decreasing', 'Price Gap — is market healthy']
  },
  {
    title: "If you're a Buyer",
    subtitle: 'Check entry timing and strategy pressure',
    items: ['Price Gap — how far from floor', 'Strategy Pressure — is support active', 'Last Buyback — when was the last one']
  },
  {
    title: "If you're a Trader",
    subtitle: 'Analyze depth and market speed',
    items: ['NFTs to Floor — order book depth', 'LP Depth — can you trade size', 'Recent Activity — momentum direction']
  }
];

function HowToUseSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">How to Use It</h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Playbook for different user types
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {groups.map((group, index) => (
          <div key={index} className="card">
            <h3 className="text-base font-semibold text-gray-900 mb-2">{group.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{group.subtitle}</p>
            <ul className="space-y-2">
              {group.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowToUseSection;
