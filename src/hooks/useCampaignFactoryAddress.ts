import { useRouter } from 'next/router';

const useCampaignFactoryAddress = () => {
  const { query } = useRouter();

  const envCampaignFactoryAddress = process.env.campaignFactoryAddress;

  return envCampaignFactoryAddress.length
    ? envCampaignFactoryAddress
    : query.campaignFactory;
};

export default useCampaignFactoryAddress;
