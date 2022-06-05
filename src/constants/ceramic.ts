import type { ConnectNetwork } from '@self.id/framework';

export type AppNetwork = ConnectNetwork | 'local-clay' | 'local-dev';

type NetworkConfig = {
  ceramicURL: string;
  connectNetwork: ConnectNetwork;
};

const NETWORK_CONFIGS: Record<AppNetwork, NetworkConfig> = {
  'local-dev': {
    ceramicURL: 'http://127.0.0.1:6000',
    connectNetwork: 'dev-unstable',
  },
  'dev-unstable': {
    ceramicURL: 'https://ceramic-private-dev.3boxlabs.com',
    connectNetwork: 'dev-unstable',
  },
  'local-clay': {
    ceramicURL: 'http://127.0.0.1:6000',
    connectNetwork: 'testnet-clay',
  },
  'testnet-clay': {
    ceramicURL: 'https://ceramic-private-clay.3boxlabs.com',
    connectNetwork: 'testnet-clay',
  },
  mainnet: {
    ceramicURL: 'https://ceramic-private.3boxlabs.com',
    connectNetwork: 'mainnet',
  },
};

export const APP_NETWORK: AppNetwork =
  (process.env.NEXT_PUBLIC_CERAMIC_APP_NETWORK as AppNetwork | undefined) ??
  ('testnet-clay' as AppNetwork);

export const CERAMIC_URL = NETWORK_CONFIGS[APP_NETWORK].ceramicURL;
export const CONNECT_NETWORK = NETWORK_CONFIGS[APP_NETWORK].connectNetwork;
