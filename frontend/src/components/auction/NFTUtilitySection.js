import React from 'react';

const NFTUtilitySection = () => {
  const utilityItems = [
    {
      title: 'XP & Rewards',
      description: 'Earn experience points through auctions, missions, and engagement. XP unlocks special features and lets you climb the ranks.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      )
    },
    {
      title: 'Auction Mechanics',
      description: 'Live auctions with real-time bidding. Each bid increases your XP and improves chances for rare NFTs from exclusive collections.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      )
    },
    {
      title: 'NFT Fusion System',
      description: 'Combine two NFTs to create a new one with enhanced properties and higher rarity. Each fusion has a chance for unique outcomes.',
      icon: (
        <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></>
      )
    },
    {
      title: 'Community Features',
      description: 'Connect with collectors, follow their activity, and compete in challenges. Build your reputation in the FOMO NFT ecosystem.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      )
    },
    {
      title: 'Badge Collection',
      description: 'Earn badges for achievements on the platform. Display them on your profile to showcase your accomplishments and expertise.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      )
    },
    {
      title: 'Regular Drops',
      description: 'Expect regular NFT releases with exclusive themes and limited editions. Set reminders to never miss rare cosmic collectibles.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      )
    }
  ];

  return (
    <section className="mt-12 mb-12 py-12">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Why Own FOMO NFTs?</h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Beyond collectibles — unlock real utility, rewards, and exclusive ecosystem benefits
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {utilityItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.icon}
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NFTUtilitySection;
