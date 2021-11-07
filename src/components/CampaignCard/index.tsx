import Image from 'next/image';

import {
  Box,
  Flex,
  Spacer,
  Text,
  Heading,
  Avatar,
  Badge,
  Progress,
  Center,
} from '@chakra-ui/react';

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
      <Badge w='auto' bg='orange.500' px={3} py={1} borderRadius='sm'>
        {badge}
      </Badge>
      <Spacer />
      <Box w='lg'>
        <Badge w='auto' bg='yellow.500' px={3} py={1} mt={-5} borderRadius='sm'>
          {category}
        </Badge>
        <Heading color='white'>{heading}</Heading>
        <Text color='white' mt={2} mb={4} noOfLines={3}>
          {body}
        </Text>
        <Text as='span' fontSize='30px' color='purple.200' fontFamily='DM mono'>
          #{raised}M{' '}
          <Text as='span' fontSize='15px'>
            of {target}M raised
          </Text>
        </Text>
        <Box mt={5} display='flex' alignItems='center' w='sm'>
          <Text color='white' fontWeight='700' mr='7px' fontSize='12px'>
            60%
          </Text>
          <Progress
            value={60}
            backgroundColor='whiteAlpha.400'
            colorScheme='green'
            borderRadius='4px'
            size='sm'
            w='full'
          />
        </Box>
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
    h='430px'
    maxW='398px'
    borderWidth='1px'
    borderColor='rgba(0, 0, 0, 0.06)'
    borderRadius='lg'
    overflow='hidden'
    position='relative'
  >
    <Image
      src={image}
      alt={heading}
      width='398'
      height='175'
      objectFit={'cover'}
    />
    <Box px={4}>
      <Box display='flex' alignItems='center' pt='.68rem'>
        <Box display='flex' alignItems='center'>
          <Avatar h='24px' w='24px' />
          <Text
            fontWeight='700'
            textTransform='capitalize'
            fontSize='14px'
            ml='5px'
            color='gray.500'
          >
            0x6b92...94ef
          </Text>
        </Box>
        <Spacer />
        <Badge w='auto' bg='yellow.500' px={3} py={1} borderRadius='sm'>
          {category}
        </Badge>
      </Box>
      <Box mt={3}>
        <Heading fontSize='xl' textTransform='capitalize' fontWeight='500'>
          {heading}
        </Heading>
        <Text color='gray.500' mt={1} noOfLines={3}>
          {body}
        </Text>
      </Box>
      <Box mt={9} display='flex' alignItems='center'>
        <Text fontWeight='700' mr='7px' fontSize='12px'>
          5%
        </Text>
        <Progress
          value={5}
          colorScheme='green'
          borderRadius='4px'
          size='sm'
          w='full'
        />
      </Box>
    </Box>
    <Box
      position='absolute'
      w='full'
      bottom='0'
      bgColor='gray.50'
      borderTop='1px solid rgba(0, 0, 0, 0.06)'
    >
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box
          display='flex'
          alignItems='center'
          flex='1'
          p={2}
          borderRight='1px solid rgba(0, 0, 0, 0.06)'
        >
          <Center backgroundColor='rgba(0, 0, 0, 6%)' borderRadius='md' p={2}>
            <Image src='/pax.svg' height='20px' width='20px' alt='token' />
          </Center>
          <Text
            as='span'
            fontFamily='DM mono'
            fontSize='xl'
            fontWeight='500'
            ml='2'
          >
            $4,698.89
          </Text>
          <Text as='span' fontSize='14px' ml='1'>
            {' '}
            of 1.2M raised
          </Text>
        </Box>
        <Box>
          <Center w='52px' cursor='pointer'>
            <svg
              width='18'
              height='25'
              viewBox='0 0 18 25'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M17 23.062L8.99907 18.416L1 23.062V2.61951C1 2.37307 1.10536 2.13672 1.29289 1.96247C1.48043 1.78821 1.73478 1.69031 2 1.69031H16C16.2652 1.69031 16.5196 1.78821 16.7071 1.96247C16.8946 2.13672 17 2.37307 17 2.61951V23.062Z'
                fill='#E2E8F0'
                stroke='#A0AEC0'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Center>
        </Box>
      </Box>
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
