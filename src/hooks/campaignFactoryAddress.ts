import { useRouter } from 'next/router';

const useCampaignFactoryAddress = (): string => {
  const { query } = useRouter();

  const envCampaignFactoryAddress = process.env.campaignFactoryAddress;

  return envCampaignFactoryAddress.length
    ? envCampaignFactoryAddress
    : (query.campaignFactory as string) || '';
};

export default useCampaignFactoryAddress;
