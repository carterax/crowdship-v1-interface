import Onboard from 'bnc-onboard';
import Web3 from 'web3';
import Factory from '@/abis/Factory.json';
import CampaignFactory from '@/abis/CampaignFactory.json';
import Campaign from '@/abis/Campaign.json';
import CampaignRewards from '@/abis/CampaignRewards.json';
import { V1_CORE_FACTORY_ADDRESS } from '@/constants/addresses';
import { SupportedChainId, DEFAULT_CHAIN_ID } from '@/constants/chains';

const DAPP_ID = 'f103de9f-3220-41f0-97c1-9ed286b86fc2';
const PORTIS_ID = 'b0c1514e-eb13-4102-be08-85b6f02a5f34';
const FORTMATIC_KEY = 'pk_test_D1E1D4C8EC7B99EB';

export let web3: any;

export let FACTORY: any;

export const CAMPAIGN_FACTORY = (address: string) =>
  new web3.eth.Contract(CampaignFactory as any, address);

export const CAMPAIGN = (address: string) =>
  new web3.eth.Contract(Campaign as any, address);

export const CAMPAIGN_REWARDS = (address: string) =>
  new web3.eth.Contract(CampaignRewards as any, address);

export const onboard = Onboard({
  dappId: DAPP_ID,
  networkId: 1337,
  networkName: 'Localhost 8545',
  subscriptions: {
    wallet: async (wallet: any) => {
      web3 = new Web3(wallet.provider);
      FACTORY = new web3.eth.Contract(Factory as any, V1_CORE_FACTORY_ADDRESS);
      window.localStorage.setItem('selectedWallet', wallet.name);
    },
  },
});