import { SupportedChainId } from '@/constants/chains';
import { useContract } from '@/hooks/web3Onboard';

import { useConnectedChain } from '@/hooks/web3Onboard';

import FactoryABI from '@/abis/Factory.json';
import CampaignFactoryABI from '@/abis/CampaignFactory.json';
import CampaignABI from '@/abis/Campaign.json';
import CampaignRequestABI from '@/abis/CampaignRequest.json';
import CampaignRewardABI from '@/abis/CampaignReward.json';
import CampaignVoteABI from '@/abis/CampaignVote.json';

import {
  Factory,
  CampaignFactory,
  Campaign,
  CampaignRequest,
  CampaignReward,
  CampaignVote,
} from '@/types/contracts';

type ContractName =
  | 'factoryImplementation'
  | 'campaignFactoryImplementation'
  | 'campaignImplementation'
  | 'campaignRequestImplementation'
  | 'campaignVoteImplementation'
  | 'campaignRewardImplementation'
  | 'myCrowdship';

export const useFactory = (address: string): Factory => {
  const contract = useContract();

  if (!contract) return;

  return contract(address, FactoryABI) as Factory;
};

export const useCampaignFactory = (address: string): CampaignFactory => {
  const contract = useContract();

  if (!contract) return;

  return contract(address, CampaignFactoryABI) as CampaignFactory;
};

export const useCampaign = (address: string): Campaign => {
  const contract = useContract();

  if (!contract) return;

  return contract(address, CampaignABI) as Campaign;
};

export const useCampaignRequest = (address: string): CampaignRequest => {
  const contract = useContract();

  if (!contract) return;

  return contract(address, CampaignRequestABI) as CampaignRequest;
};

export const useCampaignReward = (address: string): CampaignReward => {
  const contract = useContract();

  if (!contract) return;

  return contract(address, CampaignRewardABI) as CampaignReward;
};

export const useCampaignVote = (address: string): CampaignVote => {
  const contract = useContract();

  if (!contract) return;

  return contract(address, CampaignVoteABI) as CampaignVote;
};

export const useContractAddress = (): ((
  contractName: ContractName
) => string) => {
  const connectedChain = useConnectedChain();
  const defaultChain = process.env.defaultChain;

  const contractAddress = (contractName: ContractName): string => {
    if (connectedChain && connectedChain.id) {
      switch (connectedChain.id) {
        case SupportedChainId.RINKEBY:
          return process.env.rinkeby[contractName];
        case SupportedChainId.ETHEREUM:
          return process.env.ethereum[contractName];
        case SupportedChainId.POLYGON:
          return process.env.polygon[contractName];
        case SupportedChainId.BSC:
          return process.env.bsc[contractName];
        default:
          return process.env[defaultChain][contractName];
      }
    }
  };

  return contractAddress;
};
