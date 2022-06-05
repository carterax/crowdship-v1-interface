import { FC, ReactNode } from 'react';
import { Box, Heading, Text, Badge } from '@chakra-ui/react';

export interface IRewardCard {
  title: string;
  description: string;
  cost: number;
  discount: number;
  perks: string[];
  deliveryDate: string;
  shippingException: boolean;
  stock: number;
  rewardeeCount: number;
}

export const RewardCard: FC<IRewardCard> = ({
  title,
  description,
  cost,
  discount,
  perks,
  deliveryDate,
  shippingException,
  stock,
  rewardeeCount,
}) => {
  const renderInclusions = (): ReactNode[] => {
    return perks.map((perk) => <li key={perk}>{perk}</li>);
  };

  return (
    <Box borderWidth='1px' borderColor='blackAlpha.300' p='5'>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Badge>{cost}</Badge>
      <Badge>{discount}</Badge>
      <Box>
        <ul>{renderInclusions()}</ul>
      </Box>
      <Text>{deliveryDate}</Text>
      <Text>{shippingException}</Text>
      <Text>{stock}</Text>
      <Text>{rewardeeCount}</Text>
    </Box>
  );
};
