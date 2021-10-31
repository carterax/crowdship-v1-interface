import { ReactNode } from 'react';
import {
  Stack,
  Heading,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

type HeroProps = {
  header: string;
  body: string;
  height: string;
  bgImage?: string;
  bgSize?: string;
  bgPosition?: string;
  bgColor?: string;
  bgRepeat?: string;
  actions?: ReactNode;
};

export const Hero = ({
  header,
  body,
  height,
  bgImage,
  bgSize,
  bgPosition,
  bgColor,
  bgRepeat,
  actions,
}: HeroProps) => {
  return (
    <Flex
      w={'full'}
      h={height}
      backgroundColor={bgColor}
      backgroundImage={`url(${bgImage})`}
      backgroundSize={bgSize}
      backgroundPosition={bgPosition}
      backgroundRepeat={bgRepeat}
    >
      <VStack w={'full'} px={useBreakpointValue({ base: 4, md: 8 })}>
        <Stack
          flex={1}
          justify={'center'}
          w={{ base: 'md', md: '2xl', lg: '6xl' }}
        >
          <Heading
            lineHeight={1.3}
            w='xl'
            fontWeight={500}
            fontSize={{ base: '2xl', md: '36px' }}
          >
            <Text>{header}</Text>
          </Heading>
          <Text color={'gray.500'}>{body}</Text>
          <Stack w='300px' paddingTop='10px'>
            {actions}
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};
