import { useContract } from '@/hooks/web3Onboard';

import {
  Factory,
  CampaignFactory,
  Campaign,
  CampaignRequest,
  CampaignReward,
  CampaignVote,
} from '@/types/contracts';

export const useFactory = async (address: string): Promise<Factory> => {
  const contract = useContract();
  const FactoryABI = (await import('@/abis/Factory.json')).default;

  if (!contract) return;

  return contract(address, FactoryABI) as Factory;
};

export const useCampaignFactory = async (
  address: string
): Promise<CampaignFactory> => {
  const contract = useContract();
  const CampaignFactoryABI = (await import('@/abis/CampaignFactory.json'))
    .default;

  if (!contract) return;

  return contract(address, CampaignFactoryABI) as CampaignFactory;
};

export const useCampaign = async (address: string): Promise<Campaign> => {
  const contract = useContract();
  const CampaignABI = (await import('@/abis/Campaign.json')).default;

  if (!contract) return;

  return contract(address, CampaignABI) as Campaign;
};

export const useCampaignRequest = async (
  address: string
): Promise<CampaignRequest> => {
  const contract = useContract();
  const CampaignRequestABI = (await import('@/abis/CampaignRequest.json'))
    .default;

  if (!contract) return;

  return contract(address, CampaignRequestABI) as CampaignRequest;
};

export const useCampaignReward = async (
  address: string
): Promise<CampaignReward> => {
  const contract = useContract();
  const CampaignRewardABI = (await import('@/abis/CampaignReward.json'))
    .default;

  if (!contract) return;

  return contract(address, CampaignRewardABI) as CampaignReward;
};

export const useCampaignVote = async (
  address: string
): Promise<CampaignVote> => {
  const contract = useContract();
  const CampaignVoteABI = (await import('@/abis/CampaignVote.json')).default;

  if (!contract) return;

  return contract(address, CampaignVoteABI) as CampaignVote;
};
