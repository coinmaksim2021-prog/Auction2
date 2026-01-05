import React from 'react';

function HeroSection({ setCurrentPage }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="hero-background">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
        <div className="hero-grid"></div>
      </div>
      
      <div className="text-center animate-fade-in relative z-10">
        <h1 className="text-6xl font-bold mb-6">
          FOMO Strategy
          <span className="block text-gray-800 mt-2">NFT Buyback & Burn</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          An automated perpetual machine combining NFT and token buybacks to create sustainable value through strategic treasury management and supply reduction
        </p>
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => setCurrentPage('strategy')}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-base hover:from-gray-900 hover:to-black shadow-sm hover:shadow-md transition-all btn-hover-lift"
          >
            Explore Strategy →
          </button>
          <a
            href="https://www.fomo.cx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold text-base transition-all btn-hover-lift"
          >
            Buy NFT
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mt-20 animate-slide-up relative z-10">
        <div className="card-stats text-center">
          <div className="stat-number mb-2">666</div>
          <p className="text-gray-500 font-medium">NFT Collection</p>
        </div>
        <div className="card-stats text-center">
          <div className="stat-number mb-2">$50M+</div>
          <p className="text-gray-500 font-medium">Trading Volume</p>
        </div>
        <div className="card-stats text-center">
          <div className="stat-number mb-2">10K+</div>
          <p className="text-gray-500 font-medium">Active Users</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
