import React, { useState } from 'react';

const faqs = [
  { 
    q: 'Does this guarantee price growth?', 
    a: 'No, this is not a price guarantee. Strategy is a mechanism for support and scarcity creation through buyback and burn. Price depends on many factors: demand, market sentiment, overall crypto situation. Strategy only creates constant buyer pressure and reduces supply.' 
  },
  { 
    q: 'Who controls the strategy?', 
    a: 'Strategy operates by set rules and is automated through smart contracts. No manual control — everything is based on triggers: when Treasury reaches a certain level, buyback executes. All operations are recorded onchain and visible to everyone.' 
  },
  { 
    q: 'What is burn and why is it important?', 
    a: 'Burn is permanent removal of tokens from circulation. Imagine collectible coins: if you destroy some coins, the remaining ones become rarer. Less supply with same demand = potentially higher price. This is basic scarcity economics.' 
  },
  { 
    q: 'What does "NFTs to Floor" mean?', 
    a: 'This is market depth: how many NFTs need to be bought to reach floor price (minimum price). If NFTs to Floor = 10, there are 10 NFTs between current price and floor. Higher number means deeper market and harder to "break through".' 
  },
  { 
    q: 'Why is the fee fixed?', 
    a: 'Fixed fee makes the system predictable: everyone knows how much goes to Treasury. No surprises, no rule changes. This is simplicity and fairness. Users can plan their actions knowing exact conditions.' 
  }
];

function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Frequently Asked Questions</h2>
      <p className="text-center text-gray-600 mb-12">
        5 questions that answer all doubts
      </p>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <button
            key={index}
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            className={`card w-full text-left transition-all duration-300 ${
              expandedFaq === index 
                ? 'border-gray-400 shadow-md scale-[1.01]' 
                : 'hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-semibold text-gray-900 flex-1">{faq.q}</h3>
              <svg 
                className={`w-5 h-5 flex-shrink-0 transition-all duration-500 ${
                  expandedFaq === index 
                    ? 'rotate-180 text-gray-900' 
                    : 'text-gray-400'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedFaq === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`transform transition-all duration-500 ${
                expandedFaq === index ? 'translate-y-0' : '-translate-y-4'
              }`}>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
