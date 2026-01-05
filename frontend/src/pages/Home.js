import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import {
  HeroSection,
  WhatIsStrategySection,
  HowItWorksSection,
  LiveStatsWidget,
  WhatItDeliversSection,
  HowToUseSection,
  MetricsGlossary,
  TrustSection,
  ScenariosSection,
  FAQSection,
  CTASection
} from '../components/home';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://bid-platform-test.preview.emergentagent.com';

function Home({ setCurrentPage }) {
  const [strategyState, setStrategyState] = useState(null);

  // Fetch live data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/strategy/state`);
        setStrategyState(response.data);
      } catch (error) {
        console.error('Error fetching strategy state:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection setCurrentPage={setCurrentPage} />
      
      {/* All sections from "What is Strategy" with grid background */}
      <div className="relative">
        {/* Grid pattern background - same as Strategy page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
          {/* Gradient blobs for depth */}
          <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-[350px] h-[350px] bg-teal-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-300/6 rounded-full blur-3xl"></div>
        </div>
        
        {/* Content sections */}
        <div className="relative z-10">
          <WhatIsStrategySection />
          <HowItWorksSection />
          <LiveStatsWidget strategyState={strategyState} />
          <WhatItDeliversSection />
          <HowToUseSection />
          <MetricsGlossary strategyState={strategyState} />
          <TrustSection />
          <ScenariosSection />
          <FAQSection />
          <CTASection setCurrentPage={setCurrentPage} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;
