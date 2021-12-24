import CampaignFactory from '@/abis/CampaignFactory.json';
import Campaign from '@/abis/Campaign.json';
import CampaignReward from '@/abis/CampaignReward.json';
import CampaignRequest from '@/abis/CampaignRequest.json';
import CampaignVote from '@/abis/CampaignVote.json';

import { web3 } from '@/connectors/onboard';

export const CAMPAIGN_FACTORY = (address: string) => {
  return new web3.eth.Contract(CampaignFactory as any, address);
};

export const CAMPAIGN = (address: string) => {
  return new web3.eth.Contract(Campaign as any, address);
};

export const CAMPAIGN_REWARD = (address: string) => {
  return new web3.eth.Contract(CampaignReward as any, address);
};

export const CAMPAIGN_REQUEST = (address: string) => {
  return new web3.eth.Contract(CampaignRequest as any, address);
};

export const CAMPAIGN_VOTE = (address: string) => {
  return new web3.eth.Contract(CampaignVote as any, address);
};
