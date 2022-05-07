import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Flex, HStack, Link, Button, Text, Kbd } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Avatar from 'boring-avatars';

import {
  useLogout,
  useAuthenticate,
  useAuthenticated,
  useAddress,
} from '@/hooks/web3Onboard';
import { generateSlicedAddress } from '@/utils/address';
import useGlobalState from '@/hooks/globalState';
import { ReducerTypes } from '@/reducer';

const NavLink = ({
  children,
  linkTo,
}: {
  children: ReactNode;
  linkTo?: string;
}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'rgba(0, 0, 0, 0.06)',
    }}
    _focus={{
      boxShadow: 'none',
    }}
    href={linkTo}
  >
    {children}
  </Link>
);

export const Header = () => {
  const address = useAddress();
  const [authenticate, authenticating] = useAuthenticate();
  const isLoggedIn = useAuthenticated();
  const logout = useLogout();
  const { dispatch } = useGlobalState();

  const { query } = useRouter();

  const Links = [
    {
      text: 'Discover',
      url: `/my-crowdship/${query.campaignFactory}/campaigns`,
    },
    {
      text: 'Launch a campaign',
      url: `/my-crowdship/${query.campaignFactory}/launch`,
    },
  ];

  return (
    <>
      <Box bg='transparent' px={6} py={4} position='absolute' w='full'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image
                onClick={logout}
                src={'/logo-light.svg'}
                alt='crowdship logo'
                width='150'
                height='48'
              />
            </Box>
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
              variant={isLoggedIn ? 'primary' : 'primaryAlt'}
              ml={5}
              mr={4}
              size='lg'
              fontSize='md'
              borderRadius='3xl'
              leftIcon={
                isLoggedIn ? (
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
                {!isLoggedIn
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
