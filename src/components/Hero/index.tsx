import { ReactNode } from 'react';
import { Container, Box, Stack, Heading, Flex, Text } from '@chakra-ui/react';

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
      <Container maxW='1240px'>
        <Box display='flex' flexDirection='column' justifyContent={'center'}>
          <Box mt='9rem'>
            <Heading
              lineHeight={1.3}
              w='xl'
              fontWeight={500}
              fontSize={{ base: '2xl', md: '36px' }}
            >
              <Text>{header}</Text>
            </Heading>
            <Text color={'gray.500'}>{body}</Text>
            <Stack w='300px' paddingTop='20px'>
              {actions}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
};
