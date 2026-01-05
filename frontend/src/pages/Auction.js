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
