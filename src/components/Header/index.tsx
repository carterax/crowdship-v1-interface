import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useReactiveVar } from '@apollo/client';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Text,
  useDisclosure,
  Stack,
  Kbd,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Avatar from 'boring-avatars';

import { onboard } from '@/connectors';
import { walletStore } from '@/stores';
import { generateSlicedAddress } from '@/utils/address';

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
  const { address, walletName, balance } = useReactiveVar(walletStore);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { asPath } = useRouter();

  const Links = [
    { text: 'Discover', url: `/campaigns` },
    { text: 'Launch a campaign', url: `/launch` },
  ];

  const connectWallet = async () => {
    try {
      await onboard.walletSelect();
      await onboard.walletCheck();
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    await onboard.walletReset();
  };

  return (
    <>
      <Box bg='transparent' px={6} py={4} position='absolute' w='full'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image
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
            <InputGroup size='lg' w='180px'>
              <InputRightElement pointerEvents='none' mr='2'>
                <Kbd
                  display='flex'
                  alignItems='center'
                  backgroundColor='yellow.200'
                  borderColor='#E3DAAD'
                >
                  <Text as='span' fontSize='18px' mr='2px'>
                    ⌘
                  </Text>
                  K
                </Kbd>
              </InputRightElement>
              <Input
                id='search'
                variant='outlineAlt'
                cursor='pointer'
                borderRadius='3xl'
                disabled
                _placeholder={{ color: 'blackAlpha.900' }}
                placeholder='Search'
              />
            </InputGroup>
            <Button
              w='180px'
              variant={address ? 'primary' : 'primaryAlt'}
              ml={5}
              mr={4}
              size='lg'
              fontSize='md'
              borderRadius='2xl'
              leftIcon={
                address ? (
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
              onClick={connectWallet}
            >
              <Text as='span'>
                {!address ? 'Connect Wallet' : generateSlicedAddress(address)}
              </Text>
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ url, text }) => (
                <NavLink key={text} linkTo={url}>
                  {text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
