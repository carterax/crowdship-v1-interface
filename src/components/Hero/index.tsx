import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import {
  Container,
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react';
import { CaretLeft } from 'phosphor-react';

type HeroProps = {
  header: string | ReactNode;
  body?: string | ReactNode;
  height?: string;
  bgImage?: string;
  bgSize?: string;
  bgPosition?: string;
  bgColor?: string;
  bgRepeat?: string;
  actions?: ReactNode;
  showBackButton?: boolean;
  backButtonText?: string;
  media?: ReactNode;
  style?: any;
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
  showBackButton,
  backButtonText,
  media,
  style,
}: HeroProps) => {
  const router = useRouter();

  return (
    <Flex
      w='full'
      h={height}
      backgroundColor={bgColor}
      backgroundImage={`url(${bgImage})`}
      backgroundSize={bgSize}
      backgroundPosition={bgPosition}
      backgroundRepeat={bgRepeat}
      style={style}
    >
      <Container maxW='1240px'>
        <Box display='flex' flexDirection='column' justifyContent={'center'}>
          <Box mt='7rem'>
            {showBackButton ? (
              <Button
                cursor='pointer'
                alignItems='center'
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                marginBottom='.2rem'
                padding='0'
                background='transparent'
                _active={{
                  background: 'transparent',
                }}
                _hover={{
                  background: 'transparent',
                  color: 'black',
                }}
                color='blackAlpha.500'
              >
                <CaretLeft size={22} />
                <Text fontSize='16px' fontWeight='500'>
                  {backButtonText}
                </Text>
              </Button>
            ) : null}
            <Box display='flex'>
              {media ? (
                <Box w='full' overflow='hidden' margin='0px 40px 0px 0px'>
                  {media}
                </Box>
              ) : null}
              <Box w='md'>
                <Box>{header}</Box>
                <Box mb='3'>{body}</Box>
                <Stack>{actions}</Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
};
