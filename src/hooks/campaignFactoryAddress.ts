import { useRouter } from 'next/router';
import { useContractAddress } from '@/hooks/contracts';

const useCampaignFactoryAddress = (): string => {
  const { query } = useRouter();

  const contractAddress = useContractAddress();
  const campaignFactoryAddress = contractAddress('myCrowdship');

  if (query.myCrowdship) return query.myCrowdship as string;

  return campaignFactoryAddress;
};

export default useCampaignFactoryAddress;
