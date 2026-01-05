// NFT utility functions

/**
 * Get rarity based on token_id
 * @param {number} tokenId - NFT token ID
 * @returns {Object} - Rarity object with name, color, and bg
 */
export const getRarity = (tokenId) => {
  const rarities = [
    { name: 'Common', color: 'text-gray-600', bg: 'bg-gray-100' },
    { name: 'Uncommon', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Rare', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Epic', color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Legendary', color: 'text-orange-600', bg: 'bg-orange-50' }
  ];
  const index = tokenId % 100 < 5 ? 4 : tokenId % 100 < 15 ? 3 : tokenId % 100 < 35 ? 2 : tokenId % 100 < 60 ? 1 : 0;
  return rarities[index];
};
