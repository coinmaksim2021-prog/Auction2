import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import {
  AuctionTimer,
  AuctionChart,
  PlaceBidPanel,
  GamificationMechanics,
  TopBidders,
  LiveActivity,
  RecentActivity,
  HowAuctionWorks,
  RaritySection,
  CollectionOverview
} from '../components/auction';

function Auction() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 43,
    seconds: 25
  });

  // Auction stats (static for now - will be dynamic later)
  const currentBid = 850;
  const totalBids = 137;
  const participants = 89;
  const onlineUsers = 42;
  const bidsLastHour = 23;
  const ogTrailblazers = 94;

  // Modal state
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  // Activity hint state
  const [showActivityHint, setShowActivityHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(null);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Random activity hints
  useEffect(() => {
    const hints = [
      { user: '0x7a3...f2d', amount: '1200 USDC' },
      { user: '0x9c1...a8b', amount: '950 USDC' },
      { user: '0x4e2...c7f', amount: '1800 USDC' },
      { user: '0x2b5...d9e', amount: '750 USDC' },
      { user: '0x8f4...b3a', amount: '2100 USDC' }
    ];

    const showRandomHint = () => {
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      setCurrentHint(randomHint);
      setShowActivityHint(true);
      setTimeout(() => setShowActivityHint(false), 8000);
    };

    const initialTimeout = setTimeout(showRandomHint, 3000);
    const interval = setInterval(showRandomHint, Math.random() * 10000 + 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handlePlaceBid = () => {
    setShowBidModal(true);
  };

  const handleConfirmBid = () => {
    alert(`Bid of ${bidAmount || '0'} USDC placed!`);
    setShowBidModal(false);
    setBidAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" data-testid="auction-page">
      {/* Background Grid */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header with Timer */}
        <AuctionTimer timeLeft={timeLeft} />

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6 items-start">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            <AuctionChart 
              ogTrailblazers={ogTrailblazers}
              totalBids={totalBids}
              participants={participants}
            />
            <RecentActivity />
            <HowAuctionWorks />
            <RaritySection timeLeft={timeLeft} />
          </div>

          {/* Right Column */}
          <div className="col-span-1 space-y-6">
            <PlaceBidPanel 
              currentBid={currentBid}
              totalBids={totalBids}
              participants={participants}
              onPlaceBid={handlePlaceBid}
            />
            <GamificationMechanics />
            <CollectionOverview />
            <TopBidders />
            <LiveActivity 
              onlineUsers={onlineUsers}
              bidsLastHour={bidsLastHour}
            />
          </div>
        </div>

        {/* Last Chance Section */}
        <LastChanceSection 
          timeLeft={timeLeft}
          onPlaceBid={handlePlaceBid}
        />

        {/* NFT Utility Section */}
        <NFTUtilitySection />

        {/* User Evolution Section */}
        <UserEvolutionSection />

        {/* FOMO Universe Section */}
        <FOMOUniverseSection />
      </div>

      {/* Activity Hint Toast */}
      {showActivityHint && currentHint && (
        <ActivityHintToast hint={currentHint} />
      )}

      {/* Place Bid Modal */}
      {showBidModal && (
        <BidModal 
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          onClose={() => setShowBidModal(false)}
          onConfirm={handleConfirmBid}
        />
      )}

      <Footer />
    </div>
  );
}

// Last Chance Section Component
const LastChanceSection = ({ timeLeft, onPlaceBid }) => (
  <div className="mt-12 mb-12 py-12 text-center">
    <div className="flex items-center justify-center gap-2 text-red-500 mb-6">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-lg">Time left: <span className="font-semibold">{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span></span>
    </div>
    
    <h2 className="text-4xl font-bold text-gray-900 mb-6">Last Chance – Last Hero</h2>
    
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      The last 3 bids will receive "Last Heroes" status. One guaranteed <span className="text-emerald-600 font-semibold">Uncommon+</span>
    </p>
    
    <button 
      onClick={onPlaceBid}
      className="inline-flex items-center justify-center px-12 py-4 bg-gray-900 text-white text-lg font-semibold rounded-2xl hover:bg-black transition-all shadow-lg hover:shadow-xl"
    >
      Place Bid
    </button>
  </div>
);

// FOMO Universe Section Component
const FOMOUniverseSection = () => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">FOMO Universe</h2>
    <div className="grid grid-cols-3 gap-6">
      <UniverseCard
        title="Pre-Mint BOX"
        items={['666 Total Boxes', '3 Rarity Levels', 'Used for Box Fusion']}
      />
      <UniverseCard
        title="Main Collection"
        items={['4,444 NFTs', '5 Rarity Tiers', 'XP Multipliers']}
      />
      <UniverseCard
        title="Box Fusion"
        items={['Burn 2 Boxes → 1 NFT', 'Rarity based on input', '~2% Hidden NFT chance']}
      />
    </div>
    
    <div className="mt-6 grid grid-cols-2 gap-6">
      <UniverseCard
        title="Hidden NFT"
        items={[
          'Secret layer (~2-5% of collection)',
          'x1.25 XP Multiplier',
          'Activation: Level 4 + 5 badges + 90 days'
        ]}
      />
      <UniverseCard
        title="Singularity NFT"
        items={[
          'Max 33 in existence',
          'x2.5 XP Boost',
          'Requires: Hidden NFT + Level 5 + All 7 badges',
          '90-day trading lock after transformation'
        ]}
      />
    </div>
  </div>
);

// Universe Card Component
const UniverseCard = ({ title, items }) => (
  <div className="card">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
          <span className="text-emerald-500 mt-1">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// Activity Hint Toast Component
const ActivityHintToast = ({ hint }) => (
  <div className="fixed bottom-6 left-6 bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-sm z-50">
    <div className="flex items-center gap-3">
      <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <div>
        <p className="text-sm font-semibold text-gray-900">Bid Placed</p>
        <p className="text-xs text-gray-600">{hint.user} bid {hint.amount}</p>
      </div>
    </div>
  </div>
);

// NFT Utility Section Component
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

// Bid Modal Component
const BidModal = ({ bidAmount, setBidAmount, onClose, onConfirm }) => {
  const quickBids = [
    { amount: '100', label: 'Minimum bid' },
    { amount: '200', label: '+5% Rarity Boost', highlight: true },
    { amount: '300', label: '+10% Rarity Boost', highlight: true },
    { amount: '500', label: '+20% Rarity + Early Bird', highlight: true }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Place Your Bid</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Bid Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bid Amount (USDC)</label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          {/* Quick Bid Suggestions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
            <div className="grid grid-cols-2 gap-3">
              {quickBids.map((quick, i) => (
                <button
                  key={i}
                  onClick={() => setBidAmount(quick.amount)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    bidAmount === quick.amount 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{quick.amount} USDC</p>
                  <p className={`text-xs ${quick.highlight ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {quick.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Info */}
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-600">
              Higher bids increase your chances for rare NFTs. Unique bid amounts give additional bonus.
            </p>
          </div>
          
          {/* Confirm Button */}
          <button 
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all shadow-lg"
            onClick={onConfirm}
          >
            Confirm Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auction;
