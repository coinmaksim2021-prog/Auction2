import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useWeb3 } from '../context/Web3Context';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;

/**
 * Simplified InviteModal without Dynamic.xyz
 * Uses existing Web3Context for wallet connection
 * 
 * 4 Steps:
 * 1. Connect Wallet
 * 2. Enter Invite Code
 * 3. Connect Twitter (optional)
 * 4. Accept Terms & Complete
 */

function InviteModalSimple({ isOpen, onClose }) {
  console.log('=== InviteModalSimple RENDER ===', { isOpen });
  
  const { walletAddress, connectWallet, disconnectWallet } = useWeb3();
  
  const [step, setStep] = useState(1);
  const [inviteCode, setInviteCode] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Check if wallet is already registered
  useEffect(() => {
    if (walletAddress) {
      checkWalletRegistration();
    }
  }, [walletAddress]);

  const checkWalletRegistration = async () => {
    try {
      const response = await fetch(`${API}/wallet/check/${walletAddress}`);
      const data = await response.json();
      
      if (data.is_registered) {
        setIsRegistered(true);
        setInviteCode(data.invite_code || '');
        setTwitterUsername(data.twitter_username || '');
        setStep(5); // Welcome back screen
      } else {
        setStep(2); // Invite code entry
      }
    } catch (err) {
      console.error('Error checking wallet:', err);
    }
  };

  const handleConnectWallet = async () => {
    try {
      setIsLoading(true);
      setError('');
      await connectWallet();
    } catch (err) {
      setError('Failed to connect wallet');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteCodeSubmit = async () => {
    if (!inviteCode || inviteCode.length < 4) {
      setError('Please enter a valid invite code');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`${API}/wallet/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet_address: walletAddress,
          invite_code: inviteCode.toUpperCase()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      setStep(3); // Twitter connection
    } catch (err) {
      setError(err.message || 'Failed to register wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwitterConnect = async () => {
    if (twitterUsername) {
      try {
        setIsLoading(true);
        await fetch(`${API}/wallet/update/${walletAddress}?twitter_username=${twitterUsername}`, {
          method: 'PUT'
        });
      } catch (err) {
        console.error('Failed to update Twitter:', err);
      } finally {
        setIsLoading(false);
      }
    }
    setStep(4); // Terms acceptance
  };

  const handleComplete = () => {
    if (!agreedToTerms) {
      setError('Please accept the terms to continue');
      return;
    }

    setShowConfetti(true);
    setTimeout(() => {
      onClose();
      // Reset state
      setStep(1);
      setInviteCode('');
      setTwitterUsername('');
      setAgreedToTerms(false);
      setShowConfetti(false);
    }, 3000);
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setStep(1);
    setIsRegistered(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  // Use React Portal to render modal at body level
  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      {/* Modal */}
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mx-4"
        style={{ 
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Step 1: Connect Wallet */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">Connect your wallet to get started</p>
            
            <button
              onClick={handleConnectWallet}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all disabled:opacity-50"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Enter Invite Code */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Enter Invite Code</h2>
            <p className="text-gray-600 mb-4">Enter your invite code to register</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Invite Code</label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="XXXX-XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                maxLength={16}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleInviteCodeSubmit}
              disabled={isLoading || !inviteCode}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Continue'}
            </button>
          </div>
        )}

        {/* Step 3: Connect Twitter */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Connect Twitter</h2>
            <p className="text-gray-600 mb-4">Optional: Link your Twitter account</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Username</label>
              <input
                type="text"
                value={twitterUsername}
                onChange={(e) => setTwitterUsername(e.target.value.replace('@', ''))}
                placeholder="@username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Skip
              </button>
              <button
                onClick={handleTwitterConnect}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Continue'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Accept Terms */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Accept Terms</h2>
            <p className="text-gray-600 mb-4">Review and accept our terms to complete registration</p>

            <div className="mb-4 p-4 bg-gray-50 rounded-xl max-h-48 overflow-y-auto text-sm text-gray-600">
              <p className="mb-2">By accepting, you agree to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Our Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>

            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">
                I have read and agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleComplete}
              disabled={!agreedToTerms}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50"
            >
              Complete Registration 🎉
            </button>
          </div>
        )}

        {/* Step 5: Welcome Back (Already Registered) */}
        {step === 5 && (
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-gray-600 mb-4">Your wallet is already registered</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
              <div className="text-xs text-gray-500 mb-1">Wallet</div>
              <div className="font-mono text-sm mb-3">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</div>
              
              <div className="text-xs text-gray-500 mb-1">Invite Code</div>
              <div className="font-semibold text-sm mb-3">{inviteCode}</div>
              
              {twitterUsername && (
                <>
                  <div className="text-xs text-gray-500 mb-1">Twitter</div>
                  <div className="text-sm">@{twitterUsername}</div>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDisconnect}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Disconnect
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default InviteModalSimple;
