import React from 'react';

// Данные для модалей (сохранены для будущего использования)

export const cosmicBadges = [
  { name: 'Nova', duration: '1 month staking', icon: 'star' },
  { name: 'Quasar', duration: '3 months staking', icon: 'globe' },
  { name: 'Nebula', duration: '6 months staking', icon: 'sparkle' },
  { name: 'Pulsar', duration: '9 months staking', icon: 'moon' },
  { name: 'Supernova', duration: '12 months staking', icon: 'sun' },
  { name: 'Galaxy', duration: '15 months staking', icon: 'globe' },
  { name: 'Cosmos', duration: '18 months staking', icon: 'star' }
];

export const xpLevels = [
  { level: 1, xp: '0-999 XP', name: 'Novice' },
  { level: 2, xp: '1000-1999 XP', name: 'Explorer' },
  { level: 3, xp: '2000-2999 XP', name: 'Collector' },
  { level: 4, xp: '3000-4999 XP', name: 'Master' },
  { level: 5, xp: '5000+ XP', name: 'Legend' }
];

// Icon component
const BadgeIcon = ({ type, className = "w-5 h-5" }) => {
  const icons = {
    star: (
      <svg className={`${className} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    globe: (
      <svg className={`${className} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    sparkle: (
      <svg className={`${className} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    moon: (
      <svg className={`${className} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    sun: (
      <svg className={`${className} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  };
  return icons[type] || icons.star;
};

// Cosmic Badges Modal Component
export const CosmicBadgesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Cosmic Badges</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {cosmicBadges.slice(0, 4).map((badge, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                <BadgeIcon type={badge.icon} className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{badge.name}</p>
                <p className="text-sm text-gray-500">{badge.duration}</p>
              </div>
            </div>
          ))}
          
          <p className="text-sm text-gray-500 text-center pt-2">
            +3 more cosmic badges
          </p>
        </div>
      </div>
    </div>
  );
};

// XP Progression Modal Component
export const XPProgressionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">XP Progression</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          {xpLevels.map((level, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">Lv.{level.level}</span>
                <span className="text-sm text-gray-600">{level.name}</span>
              </div>
              <span className="text-xs text-gray-500">{level.xp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default { CosmicBadgesModal, XPProgressionModal, cosmicBadges, xpLevels };
