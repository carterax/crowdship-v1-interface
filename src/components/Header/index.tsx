import { ReactNode } from 'react';
import Link from 'next/link';

import Image from 'next/image';
import { Box, Flex, HStack, Button, Text, Kbd } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Avatar from 'boring-avatars';

import {
  useLogout,
  useAuthenticate,
  useWalletAddress,
} from '@/hooks/web3Onboard';
import { generateSlicedAddress } from '@/utils/address';
import { useGlobalState } from '@/hooks/globalState';
import { useInjectCrowdshipQuery } from '@/hooks/injectCrowdshipQuery';

import { ReducerTypes } from '@/reducer';

const NavLink = ({
  children,
  linkTo,
}: {
  children: ReactNode;
  linkTo?: string;
}) => (
  <Link href={linkTo} passHref>
    <Box
      px={2}
      py={1}
      as='a'
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'rgba(0, 0, 0, 0.06)',
      }}
      _focus={{
        boxShadow: 'none',
      }}
    >
      {children}
    </Box>
  </Link>
);

export const Header = () => {
  const address = useWalletAddress();
  const [authenticate, authenticating, authenticated] = useAuthenticate();
  const logout = useLogout();
  const { dispatch } = useGlobalState();
  const injectCrowdshipQuery = useInjectCrowdshipQuery();

  const Links = [
    {
      text: 'Discover',
      url: injectCrowdshipQuery('/campaigns'),
    },
    {
      text: 'Launch a campaign',
      url: injectCrowdshipQuery('/launch-campaign'),
    },
  ];

  return (
    <>
      <Box bg='transparent' px={6} py={4} position='absolute' w='full'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link href={injectCrowdshipQuery('/')} passHref>
              <Box as='a'>
                <Image
                  onClick={logout}
                  src={'/images/logo-light.svg'}
                  alt='crowdship logo'
                  width='150'
                  height='48'
                />
              </Box>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(({ url, text }) => (
                <NavLink key={text} linkTo={url}>
                  {text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems='center'>
            <Button
              w='180px'
              borderRadius='3xl'
              variant='primary'
              background='rgba(0, 0, 0, 0.06)'
              _hover={{
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
              }}
              size='lg'
              fontSize='md'
              onClick={() =>
                dispatch({
                  type: ReducerTypes.TOGGLE_SEARCH_MODAL,
                  payload: { searchModalDialog: { isOpen: true } },
                })
              }
            >
              <Box
                w='full'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Text color='blackAlpha.400' fontWeight='400'>
                  Search
                </Text>
                <Kbd
                  display='flex'
                  alignItems='center'
                  color='blackAlpha.700'
                  backgroundColor='yellow.200'
                  borderColor='#E3DAAD'
                >
                  <Text as='span' fontSize='18px' mr='2px'>
                    ⌘
                  </Text>
                  K
                </Kbd>
              </Box>
            </Button>
            <Button
              variant={authenticated ? 'primary' : 'primaryAlt'}
              ml={5}
              mr={4}
              size='lg'
              fontSize='md'
              borderRadius='3xl'
              leftIcon={
                authenticated ? (
                  <Avatar
                    size={30}
                    name={address}
                    variant='marble'
                    colors={[
                      '#A3A948',
                      '#EDB92E',
                      '#F85931',
                      '#CE1836',
                      '#009989',
                    ]}
                  />
                ) : (
                  <AddIcon w={3.5} h={3.5} />
                )
              }
              loadingText='Connecting...'
              isLoading={authenticating}
              onClick={authenticate}
            >
              <Text as='span'>
                {!authenticated
                  ? 'Connect Wallet'
                  : generateSlicedAddress(address)}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
