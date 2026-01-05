import React from 'react';

const UserEvolutionSection = () => {
  const fomoScoreBadges = [
    { name: 'Stellar Awakening', range: '0-199', score: 0, description: "First steps into the FOMO universe", color: 'from-gray-400 to-gray-500' },
    { name: 'Cosmic Explorer', range: '200-399', score: 200, description: "Expanding presence and exploring", color: 'from-blue-400 to-blue-500' },
    { name: 'Galactic Navigator', range: '400-599', score: 400, description: "Reliable contributor in community", color: 'from-cyan-400 to-cyan-500' },
    { name: 'Celestial Master', range: '600-799', score: 600, description: "Impact felt across the galaxy", color: 'from-purple-400 to-purple-500' },
    { name: 'Astral Sage', range: '800-899', score: 800, description: "Recognized guide in FOMO cosmos", color: 'from-orange-400 to-orange-500' },
    { name: 'Universal Enlightenment', range: '900-1000', score: 900, description: "Ultimate level, cosmic influence", color: 'from-amber-400 to-amber-500' }
  ];

  const currentScore = 350;
  
  return (
    <section className="mt-12 mb-12 py-12 bg-gray-50 rounded-3xl">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full mb-4">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-semibold text-purple-700">NFT Holders Only</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">FOMO Score Progression</h2>
        </div>
        <p className="text-center text-gray-600 mb-3 max-w-2xl mx-auto">
          Earn FOMO Score through engagement and unlock exclusive badges as you progress
        </p>
        <p className="text-center text-sm text-purple-600 font-medium mb-12 max-w-2xl mx-auto">
          ⚠️ NFT ownership required to activate and progress through FOMO Score levels
        </p>

        <div className="relative">
          <div className="absolute top-10 left-0 right-0 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-gray-400 via-blue-400 to-cyan-500 rounded-full transition-all duration-1000"
              style={{ width: `${(currentScore / 1000) * 100}%` }}
            ></div>
          </div>

          <div className="relative grid grid-cols-6 gap-4">
            {fomoScoreBadges.map((badge, index) => {
              const isAchieved = currentScore >= badge.score;
              const isCurrent = currentScore >= badge.score && (index === fomoScoreBadges.length - 1 || currentScore < fomoScoreBadges[index + 1].score);
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isAchieved 
                      ? `bg-gradient-to-br ${badge.color} shadow-lg` 
                      : 'bg-gray-200 border-2 border-gray-300'
                  } ${isCurrent ? 'ring-4 ring-blue-200 scale-110' : ''}`}>
                    <svg className={`w-10 h-10 ${isAchieved ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className={`text-sm font-bold mb-1 ${isAchieved ? 'text-gray-900' : 'text-gray-400'}`}>
                      {badge.name}
                    </p>
                    <p className={`text-xs font-semibold mb-1 ${isAchieved ? 'text-gray-600' : 'text-gray-400'}`}>
                      {badge.range}
                    </p>
                    <p className={`text-xs ${isAchieved ? 'text-gray-500' : 'text-gray-400'}`}>
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            Current Score: <span className="text-blue-600">{currentScore}</span> / 1000
          </p>
          <p className="text-sm text-gray-600">
            {currentScore < 200 
              ? `${200 - currentScore} more points to reach Cosmic Explorer`
              : currentScore < 400 
              ? `${400 - currentScore} more points to reach Galactic Navigator`
              : currentScore < 600
              ? `${600 - currentScore} more points to reach Celestial Master`
              : currentScore < 800
              ? `${800 - currentScore} more points to reach Astral Sage`
              : currentScore < 900
              ? `${900 - currentScore} more points to reach Universal Enlightenment`
              : 'Maximum level reached! 🎉'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserEvolutionSection;
