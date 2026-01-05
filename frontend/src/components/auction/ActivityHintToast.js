import React from 'react';

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

export default ActivityHintToast;
