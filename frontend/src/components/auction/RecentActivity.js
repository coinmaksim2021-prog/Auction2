import React from 'react';

const getRarityColor = (rarity) => {
  const colors = {
    'Common': 'text-gray-600 bg-gray-100',
    'Uncommon': 'text-green-600 bg-green-50',
    'Rare': 'text-blue-600 bg-blue-50',
    'Epic': 'text-purple-600 bg-purple-50',
    'Legendary': 'text-orange-600 bg-orange-50',
    'FOMO GOLD': 'text-yellow-600 bg-yellow-50'
  };
  return colors[rarity] || 'text-gray-600 bg-gray-100';
};

const recentActivityData = [
  { user: '0x7a3...f2d', action: 'Bid placed', amount: '1200 USDC', time: '2 min ago', rarity: 'Rare' },
  { user: '0x9c1...a8b', action: 'Bid placed', amount: '950 USDC', time: '5 min ago', rarity: 'Uncommon' },
  { user: '0x4e2...c7f', action: 'Box Fusion', amount: '—', time: '8 min ago', rarity: 'Epic' },
  { user: '0x2b5...d9e', action: 'Bid placed', amount: '750 USDC', time: '12 min ago', rarity: 'Uncommon' },
  { user: '0x8f4...b3a', action: 'Bid placed', amount: '2100 USDC', time: '15 min ago', rarity: 'Legendary' }
];

const RecentActivity = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Target Rarity</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivityData.map((activity, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4"><span className="font-mono text-sm text-gray-700">{activity.user}</span></td>
                <td className="py-3 px-4"><span className="text-sm text-gray-600">{activity.action}</span></td>
                <td className="py-3 px-4"><span className="text-sm font-semibold text-gray-900">{activity.amount}</span></td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRarityColor(activity.rarity)}`}>{activity.rarity}</span>
                </td>
                <td className="py-3 px-4 text-right"><span className="text-xs text-gray-500">{activity.time}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
