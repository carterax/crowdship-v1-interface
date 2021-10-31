import { ReactNode } from 'react';
import Image from 'next/image';

import { Box, Flex, Spacer, Text, Heading, Badge } from '@chakra-ui/react';

type CampaignCardProps = {
  special?: boolean;
  heading: string;
  body: string;
  image: string;
  category: string;
  raised: string;
  target: string;
  badge: string;
};

const SpecialCampaignCard = ({
  heading,
  body,
  image,
  category,
  raised,
  target,
  badge,
}: CampaignCardProps) => (
  <Box
    h='452px'
    borderRadius='lg'
    backgroundImage={image}
    backgroundPosition='center center'
    backgroundSize='cover'
    backgroundRepeat='no-repeat'
    overflow='hidden'
  >
    <Flex
      direction='column'
      bgGradient={'linear(to-t, blackAlpha.800, transparent)'}
      h='full'
      p={10}
      alignItems='flex-start'
    >
      <Badge w='auto' bg='orange.500' px={3} py={1} borderRadius='lg'>
        {badge}
      </Badge>
      <Spacer />
      <Box w='lg'>
        <Heading color='white'>{heading}</Heading>
        <Text color='white' mt={2} mb={4}>
          {body}
        </Text>
        <Text as='span' fontSize='30px' color='purple.200' fontFamily='DM mono'>
          #{raised}M{' '}
          <Text as='span' fontSize='15px'>
            of {target}M raised
          </Text>
        </Text>
      </Box>
    </Flex>
  </Box>
);

const AltCampaignCard = ({
  heading,
  body,
  image,
  category,
  raised,
  target,
  badge,
}: CampaignCardProps) => (
  <Box
    h='452px'
    maxW='398px'
    borderWidth='1px'
    borderColor='rgba(0, 0, 0, 0.06)'
    borderRadius='lg'
    overflow='hidden'
  >
    <Image
      src={image}
      alt={heading}
      width='398'
      height='180'
      objectFit={'cover'}
    />
    <Box px={6}>
      <Badge w='auto' bg='yellow.500' px={3} py={1} borderRadius='lg'>
        {category}
      </Badge>
      <Box mt={1} fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
        {heading}
      </Box>
      <Box>{body}</Box>
    </Box>
  </Box>
);

export const CampaignCard = ({ special, ...rest }: CampaignCardProps) => {
  if (special) {
    return <SpecialCampaignCard {...rest} />;
  } else {
    return <AltCampaignCard {...rest} />;
  }
};
