import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import {
  AuctionChart,
  PlaceBidPanel,
  GamificationMechanics,
  TopBidders,
  LiveActivity,
  RecentActivity,
  HowAuctionWorks,
  RaritySection,
  CollectionOverview,
  AuctionHeroSection,
  AuctionCTASection,
  LastChanceSection,
  UserEvolutionSection,
  FOMOUniverseSection,
  NFTUtilitySection,
  BidModal,
  ActivityHintToast,
  NFTBoxCollectionSection
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
        {/* Hero Section with Timer */}
        <AuctionHeroSection 
          timeLeft={timeLeft}
          totalBids={totalBids}
          participants={participants}
          onPlaceBid={handlePlaceBid}
        />

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
            <div id="how-it-works">
              <HowAuctionWorks />
            </div>
            <RaritySection timeLeft={timeLeft} />
          </div>

          {/* Right Column */}
          <div className="col-span-1 space-y-6" data-section="place-bid">
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

        {/* Last Chance - Last Hero Section */}
        <LastChanceSection 
          timeLeft={timeLeft}
          onPlaceBid={handlePlaceBid}
        />

        {/* NFT Box Collection Section */}
        <NFTBoxCollectionSection />

        {/* NFT Utility Section */}
        <NFTUtilitySection />

        {/* User Evolution Section */}
        <UserEvolutionSection />

        {/* FOMO Universe Section */}
        <FOMOUniverseSection />

        {/* Final CTA Section */}
        <AuctionCTASection 
          timeLeft={timeLeft}
          onPlaceBid={handlePlaceBid}
        />
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

export default Auction;
