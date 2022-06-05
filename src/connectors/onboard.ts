import { init } from '@web3-onboard/react';

import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import fortmaticModule from '@web3-onboard/fortmatic';
import portisModule from '@web3-onboard/portis';
import gnosisModule from '@web3-onboard/gnosis';

import { SupportedChainId } from '@/constants/chains';

declare let process: {
  env: {
    ethereum: {
      rpcUrl: string;
    };
    polygon: {
      rpcUrl: string;
    };
    bsc: {
      rpcUrl: string;
    };
    rinkeby: {
      rpcUrl: string;
    };
  };
};

const ETH_RPC_URL = process.env.ethereum.rpcUrl;
const POLYGON_RPC_URL = process.env.polygon.rpcUrl;
const BSC_RPC_URL = process.env.bsc.rpcUrl;
const RINKEBY_RPC_URL = process.env.rinkeby.rpcUrl;

const PORTIS_ID = 'b0c1514e-eb13-4102-be08-85b6f02a5f34';
const FORTMATIC_KEY = 'pk_test_D1E1D4C8EC7B99EB';

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const fortmaticSdk = fortmaticModule({
  apiKey: FORTMATIC_KEY,
});
const portisSdk = portisModule({
  apiKey: PORTIS_ID,
});
const gnosis = gnosisModule();
const injected = injectedModule();

const modules = [
  injected,
  coinbaseWalletSdk,
  walletConnect,
  fortmaticSdk,
  portisSdk,
  gnosis,
];

init({
  wallets: modules,
  accountCenter: {
    desktop: {
      enabled: false,
    },
  },
  chains: [
    {
      id: SupportedChainId.ETHEREUM as string,
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: ETH_RPC_URL,
    },
    {
      id: SupportedChainId.POLYGON as string,
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: POLYGON_RPC_URL,
    },
    {
      id: SupportedChainId.BSC as string,
      token: 'bnb',
      label: 'Binance',
      rpcUrl: BSC_RPC_URL,
    },
    {
      id: SupportedChainId.RINKEBY as string,
      token: 'rETH',
      namespace: 'evm',
      label: 'Rinkeby',
      rpcUrl: RINKEBY_RPC_URL,
    },
  ],
  appMetadata: {
    name: 'Crowdship',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: 'My app using Onboard',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    ],
  },
});
