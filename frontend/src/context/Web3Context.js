import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ACTIVE_NETWORK, ZKSYNC_MAINNET, ZKSYNC_TESTNET } from '../config/zkSync';

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Check current network
  const checkNetwork = useCallback(async () => {
    if (!isMetaMaskInstalled()) return false;
    
    try {
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdNumber = parseInt(currentChainId, 16);
      setChainId(chainIdNumber);
      
      const isCorrect = chainIdNumber === ACTIVE_NETWORK.chainId;
      setIsCorrectNetwork(isCorrect);
      return isCorrect;
    } catch (err) {
      console.error('Error checking network:', err);
      return false;
    }
  }, []);

  // Switch to zkSync network
  const switchToZkSync = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask not installed');
      return false;
    }

    try {
      // Try to switch to zkSync network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ACTIVE_NETWORK.chainIdHex }],
      });
      
      await checkNetwork();
      return true;
    } catch (switchError) {
      // Network not added to MetaMask, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: ACTIVE_NETWORK.chainIdHex,
              chainName: ACTIVE_NETWORK.name,
              nativeCurrency: ACTIVE_NETWORK.nativeCurrency,
              rpcUrls: [ACTIVE_NETWORK.rpcUrl],
              blockExplorerUrls: [ACTIVE_NETWORK.blockExplorer],
            }],
          });
          
          await checkNetwork();
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          setError('Failed to add zkSync network');
          return false;
        }
      }
      
      console.error('Error switching network:', switchError);
      setError('Failed to switch to zkSync network');
      return false;
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('Please install MetaMask to connect your wallet');
      window.open('https://metamask.io/download/', '_blank');
      return false;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        
        // Check and switch to zkSync network
        const isCorrect = await checkNetwork();
        
        if (!isCorrect) {
          // Prompt to switch to zkSync
          const switched = await switchToZkSync();
          if (!switched) {
            setError('Please switch to zkSync network to continue');
          }
        }
        
        setIsConnecting(false);
        return true;
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    }

    setIsConnecting(false);
    return false;
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setChainId(null);
    setIsCorrectNetwork(false);
    setError(null);
  };

  // Get ETH balance
  const getBalance = async (address) => {
    if (!isMetaMaskInstalled() || !address) return '0';
    
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      
      // Convert from hex wei to ETH
      const balanceInWei = parseInt(balance, 16);
      const balanceInEth = balanceInWei / 1e18;
      return balanceInEth.toFixed(4);
    } catch (err) {
      console.error('Error getting balance:', err);
      return '0';
    }
  };

  // Listen for account and network changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setWalletAddress(accounts[0]);
      }
    };

    const handleChainChanged = (newChainId) => {
      const chainIdNumber = parseInt(newChainId, 16);
      setChainId(chainIdNumber);
      setIsCorrectNetwork(chainIdNumber === ACTIVE_NETWORK.chainId);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Check if already connected
    window.ethereum.request({ method: 'eth_accounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          checkNetwork();
        }
      });

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [checkNetwork]);

  const value = {
    walletAddress,
    chainId,
    isConnecting,
    error,
    isCorrectNetwork,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    activeNetwork: ACTIVE_NETWORK,
    connectWallet,
    disconnectWallet,
    switchToZkSync,
    getBalance,
    checkNetwork,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

export default Web3Context;
