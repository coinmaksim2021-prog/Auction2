import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

/**
 * WalletBalance Component with Flip Card Effect
 * Displays connected wallet with ETH balance and USD equivalent
 * Flips to show wallet address on click
 */
function WalletBalance({ onDisconnect }) {
  const { walletAddress, getBalance } = useWeb3();
  const [balance, setBalance] = useState('0');
  const [ethPrice, setEthPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fetch ETH balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (walletAddress) {
        const bal = await getBalance(walletAddress);
        setBalance(bal);
      }
    };
    fetchBalance();
    
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [walletAddress, getBalance]);

  // Fetch ETH price in USD
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
        setEthPrice(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEthPrice();
    
    // Refresh price every 60 seconds
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Calculate USD value
  const usdValue = (parseFloat(balance) * ethPrice).toFixed(0);

  // Format wallet address
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Format balance display
  const formatBalance = (bal) => {
    const num = parseFloat(bal);
    if (num === 0) return '0.00';
    if (num < 0.01) return num.toFixed(4);
    return num.toFixed(2);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Flip Card Container */}
      <div 
        className="relative cursor-pointer"
        style={{ 
          perspective: '1000px'
        }}
        onClick={handleFlip}
      >
        <div 
          className={`relative transition-transform duration-500 ease-in-out`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front Side - Balance */}
          <div 
            className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              minHeight: '42px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-sm font-medium text-gray-900">
                {isLoading ? '...' : formatBalance(balance)}
              </span>
              <span className="text-xs font-medium text-gray-600">ETH</span>
              {ethPrice > 0 && (
                <span className="text-xs text-gray-400">
                  ≈${usdValue}
                </span>
              )}
            </div>
          </div>

          {/* Back Side - Address */}
          <div 
            className="absolute top-0 left-0 w-full px-5 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              minHeight: '42px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div className="flex items-center justify-center w-full">
              <span className="text-sm font-medium text-gray-700">
                {formatAddress(walletAddress)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disconnect button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDisconnect();
        }}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        title="Disconnect wallet"
        data-testid="disconnect-wallet-button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
}

export default WalletBalance;
