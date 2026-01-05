import React from 'react';

const steps = [
  {
    title: 'Trade Happens',
    desc: 'Someone buys or sells on the market',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  },
  {
    title: 'Treasury Grows',
    desc: 'Fees accumulate in treasury',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  },
  {
    title: 'Buyback Executes',
    desc: 'Strategy purchases from market',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  },
  {
    title: 'Burn / LP',
    desc: 'Tokens burned, liquidity added',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  }
];

function HowItWorksSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Four simple steps that transform trading activity into ecosystem support
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="card text-center hover:border-gray-300 transition-all">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {step.icon}
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-2 text-gray-900">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;
