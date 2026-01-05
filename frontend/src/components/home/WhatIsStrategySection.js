import React from 'react';

function WhatIsStrategySection() {
  return (
    <section className="relative bg-gray-50 py-16 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the Strategy?</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Strategy</strong> is an automated mechanism that transforms market activity into NFT support. Trading fees flow into the Treasury, triggering systematic buybacks and burns while strengthening liquidity.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            This is a rule-based system without manual control, where every action is recorded onchain for complete transparency.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatIsStrategySection;
