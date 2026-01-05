import React from 'react';

const trustItems = [
  { 
    title: 'Rule-Based', 
    desc: 'Strategy operates by rules, no manual control', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> 
  },
  { 
    title: 'Onchain Events', 
    desc: 'All key events recorded in blockchain', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> 
  },
  { 
    title: 'Transparent', 
    desc: 'Verify contracts and transactions in explorer', 
    icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
  }
];

function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Trust & Transparency</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {trustItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.icon}
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a href="#" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm">
          View Contract on Explorer
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default TrustSection;
