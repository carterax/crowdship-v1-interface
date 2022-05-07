import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Box, Button } from '@chakra-ui/react';

import { gun } from '@/lib/gun';

import useCampaignFactoryAddress from '@/hooks/campaignFactoryAddress';
import { useCampaignFactory } from '@/hooks/contract';

const Campaign: NextPage = (props) => {
  const [campaign, setCampaign] = useState<any>({});
  const campaignFactoryAddress = useCampaignFactoryAddress();
  const campaignFactory = useCampaignFactory(campaignFactoryAddress);

  const setCampaignState = async () => {
    // get campaign address from url
    const campaignAddress = window.location.pathname.split('/')[4];

    (await campaignFactory).campaigns(campaignAddress).then(async (res) => {
      console.log(res);
    });
  };

  return (
    <Box paddingTop='96px'>
      <Button onClick={() => console.log(campaign)}>Campaign</Button>
    </Box>
  );
};

export default Campaign;
