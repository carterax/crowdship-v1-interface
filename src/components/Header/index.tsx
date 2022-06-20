import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Kbd,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  UserCircle,
  GlobeSimple,
  Sun,
  Compass,
  FileText,
  Question,
  Wallet,
  UserFocus,
  SignOut,
} from 'phosphor-react';
import Avatar from 'boring-avatars';

import AdvancedMenu from '@/components/AdvancedMenu';

import { useLogout, useAuthenticate, useWallet } from '@/hooks/web3Onboard';
import { generateSlicedAddress } from '@/utils/address';
import { useGlobalState } from '@/hooks/globalState';
import { useInjectCrowdshipQuery } from '@/hooks/injectCrowdshipQuery';

import { ReducerTypes } from '@/reducer';
import ProfileOverviewModal from '../ProfileOverviewModal';

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
  const wallet = useWallet();
  const [authenticate, authenticating, authenticated] = useAuthenticate();
  const logout = useLogout();
  const { dispatch, state } = useGlobalState();
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

  const menuItems = [
    {
      text: 'Account',
      icon: <UserCircle size={20} />,
      onClick: () => {},
      hasDivider: true,
      children: [
        {
          text: 'Overview',
          icon: <UserFocus size={20} />,
          onClick: () => {
            dispatch({
              type: ReducerTypes.TOGGLE_PROFILE_OVERVIEW_MODAL,
              payload: { profileOverviewModal: { isOpen: true } },
            });
          },
          children: [],
          render: null,
        },
        {
          text: 'Switch wallet',
          icon: <Wallet size={20} />,
          onClick: () => authenticate(),
          children: [],
          render: null,
        },
        {
          text: null,
          icon: null,
          children: [],
          render: () => (
            <MenuItem
              icon={<UserCircle size={20} />}
              w='200px'
              m='2'
              borderRadius='md'
              as='a'
              href='#'
            >
              Manage Profile
            </MenuItem>
          ),
        },
        {
          text: null,
          icon: null,
          children: [],
          render: () => (
            <Box position='absolute' bottom='0' width='100%'>
              <MenuDivider />
              <MenuItem
                icon={<SignOut size={20} />}
                w='200px'
                m='2'
                borderRadius='md'
                onClick={() => logout()}
              >
                <Text>Logout</Text>
              </MenuItem>
            </Box>
          ),
        },
      ],
      render: null,
    },
    {
      text: 'Dark Mode',
      icon: <Sun size={20} />,
      onClick: () => {
        console.log('Dark mode');
      },
      hasDivider: false,
      children: [],
      render: null,
    },
    {
      text: 'Language',
      icon: <GlobeSimple size={20} />,
      onClick: () => {},
      hasDivider: false,
      children: [
        {
          text: 'english',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'afrikaans',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'العربية',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'español',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'français',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'deutsch',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'italiano',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'português',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: 'Український',
          icon: null,
          children: [],
          render: null,
        },
        {
          text: '简体中文',
          icon: null,
          children: [],
          render: null,
        },
      ],
      render: null,
    },
    {
      text: null,
      icon: null,
      onClick: () => {},
      hasDivider: false,
      children: [],
      render: () => (
        <MenuItem
          icon={<Question size={20} />}
          w='200px'
          m='2'
          borderRadius='md'
          as='a'
          href='#'
          target='_blank'
        >
          Help
        </MenuItem>
      ),
    },
    {
      text: null,
      icon: null,
      onClick: () => {},
      hasDivider: false,
      children: [],
      render: () => (
        <MenuItem
          icon={<Compass size={20} />}
          w='200px'
          m='2'
          borderRadius='md'
          as='a'
          href='#'
          target='_blank'
        >
          Request Features
        </MenuItem>
      ),
    },
    {
      text: null,
      icon: null,
      onClick: () => {},
      hasDivider: false,
      children: [],
      render: () => (
        <MenuItem
          icon={<FileText size={20} />}
          w='200px'
          m='2'
          borderRadius='md'
          as='a'
          href='#'
          target='_blank'
        >
          Legal & Privacy
        </MenuItem>
      ),
    },
  ];

  return (
    <>
      <ProfileOverviewModal
        profileImage={
          <Avatar
            size={100}
            name={wallet?.accounts?.[0]?.address}
            variant='marble'
            colors={['#A3A948', '#EDB92E', '#F85931', '#CE1836', '#009989']}
          />
        }
        onClose={() => {
          dispatch({
            type: ReducerTypes.TOGGLE_PROFILE_OVERVIEW_MODAL,
            payload: { profileOverviewModal: { isOpen: false } },
          });
        }}
        isOpen={state.profileOverviewModal.isOpen}
        wallet={wallet}
      />
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
            {!authenticated ? (
              <Button
                ml={5}
                mr={4}
                variant='primaryAlt'
                size='lg'
                fontSize='md'
                borderRadius='3xl'
                loadingText='Connecting...'
                isLoading={authenticating}
                onClick={authenticate}
                leftIcon={<AddIcon w={3.5} h={3.5} />}
              >
                Connect Wallet
              </Button>
            ) : (
              <AdvancedMenu
                items={menuItems}
                menuButtonStyle={{
                  variant: 'primary',
                  ml: 5,
                  mr: 4,
                  size: 'lg',
                  fontSize: 'md',
                  borderRadius: '3xl',
                  leftIcon: (
                    <Avatar
                      size={30}
                      name={wallet?.accounts?.[0]?.address}
                      variant='marble'
                      colors={[
                        '#A3A948',
                        '#EDB92E',
                        '#F85931',
                        '#CE1836',
                        '#009989',
                      ]}
                    />
                  ),
                }}
                menuButtonTrigger={
                  <Text as='span'>
                    {generateSlicedAddress(wallet?.accounts?.[0]?.address)}
                  </Text>
                }
                showOpenIcon
                closeOnBlur={false}
                closeOnSelect={false}
              />
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
