// zkSync Network Configuration

// zkSync Era Sepolia Testnet (for testing)
export const ZKSYNC_TESTNET = {
  chainId: 300,
  chainIdHex: '0x12C',
  name: 'zkSync Era Sepolia Testnet',
  rpcUrl: 'https://sepolia.era.zksync.dev',
  blockExplorer: 'https://sepolia.explorer.zksync.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  }
};

// zkSync Era Mainnet (for production)
export const ZKSYNC_MAINNET = {
  chainId: 324,
  chainIdHex: '0x144',
  name: 'zkSync Era',
  rpcUrl: 'https://mainnet.era.zksync.io',
  blockExplorer: 'https://explorer.zksync.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  }
};

// Use testnet for development
export const ACTIVE_NETWORK = ZKSYNC_TESTNET;

// Contract Addresses - zkSync Era Mainnet (SyncSwap)
export const CONTRACTS_MAINNET = {
  SYNCSWAP_ROUTER_V2: '0x9B5def958d0f3b6955cBEa4D5B7809b2fb26b059',
  SYNCSWAP_ROUTER_V3: '0x1B887a14216Bdeb7F8204Ee6a269Bd9Ff73A084C',
  WETH: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
  VAULT: '0x621425a1Ef6abE91058E9712575dcc4258F8d091',
  // Test token addresses on zkSync Era (popular tokens)
  USDC: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
  USDT: '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C',
};

// Test Token for zkSync Sepolia (you can deploy your own or use existing)
export const CONTRACTS_TESTNET = {
  // These are placeholder addresses - replace with actual testnet contracts
  WETH: '0x000000000000000000000000000000000000800A', // zkSync ETH bridge
  // For testing, we'll use a mock setup
  TEST_TOKEN: '0x0000000000000000000000000000000000000000', // Replace with deployed test token
};

// Use appropriate contracts based on network
export const CONTRACTS = CONTRACTS_MAINNET;

// Token list for swap interface
export const TOKENS = [
  {
    symbol: 'ETH',
    name: 'Ether',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    isNative: true
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: CONTRACTS.WETH,
    decimals: 18,
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    isNative: false
  },
  {
    symbol: 'F',
    name: 'FOMO Token',
    address: '0x0000000000000000000000000000000000000001', // Placeholder - will be replaced with real token
    decimals: 18,
    logo: '/logo.svg',
    isNative: false,
    isProjectToken: true
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: CONTRACTS_MAINNET.USDC,
    decimals: 6,
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
    isNative: false
  }
];

// ABI для SyncSwap Router (минимальный для swap)
export const SYNCSWAP_ROUTER_ABI = [
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              { "internalType": "address", "name": "pool", "type": "address" },
              { "internalType": "bytes", "name": "data", "type": "bytes" },
              { "internalType": "address", "name": "callback", "type": "address" },
              { "internalType": "bytes", "name": "callbackData", "type": "bytes" }
            ],
            "internalType": "struct IRouter.SwapStep[]",
            "name": "steps",
            "type": "tuple[]"
          },
          { "internalType": "address", "name": "tokenIn", "type": "address" },
          { "internalType": "uint256", "name": "amountIn", "type": "uint256" }
        ],
        "internalType": "struct IRouter.SwapPath[]",
        "name": "paths",
        "type": "tuple[]"
      },
      { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" }
    ],
    "name": "swap",
    "outputs": [
      { "internalType": "uint256", "name": "amountOut", "type": "uint256" }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
];

// ERC20 ABI для approve и balanceOf
export const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "_spender", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      { "name": "_owner", "type": "address" },
      { "name": "_spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "name": "", "type": "uint256" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "name": "", "type": "string" }],
    "type": "function"
  }
];
