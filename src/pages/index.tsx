import type { NextPage } from 'next';
import { useReactiveVar } from '@apollo/client';
import Router from 'next/router';
import Head from 'next/head';
import Web3 from 'web3';
import {
  Box,
  Flex,
  Center,
  Text,
  Spacer,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ChevronRightIcon, AddIcon } from '@chakra-ui/icons';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { onboard, FACTORY } from '@/connectors';
import { walletStore } from '@/stores';

import { V1_CAMPAIGN_FACTORY_IMPLEMENTATION } from '@/constants/addresses';

const StyledHome = styled.div`
  .crowdship__map {
    position: relative;
    left: -250px;
  }
`;

type formData = {
  revenueWallet: string;
};

const schema = yup
  .object({
    revenueWallet: yup.string().required('Required'),
  })
  .required();

const Home: NextPage = () => {
  const { walletReady } = useReactiveVar(walletStore);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const setWalletState = (walletReady: boolean) =>
    walletStore({ ...walletStore(), walletReady });

  const createDemo = async ({ revenueWallet }: formData) => {
    const { isValid, message } = isValidAddress(revenueWallet);

    if (isValid) {
      const { address } = onboard.getState();
      try {
        const tx = await FACTORY.methods
          .createCampaignFactory(
            V1_CAMPAIGN_FACTORY_IMPLEMENTATION,
            revenueWallet
          )
          .send({ from: address });

        await FACTORY.events
          .CampaignFactoryDeployed({}, { fromBlock: tx.blockNumber })
          .on('data', function (event: any) {
            Router.push(`/my-crowdship/${event.returnValues.campaignFactory}`);
          })
          .on('error', console.error);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError('revenueWallet', { type: 'manual', message });
    }
  };

  const isValidAddress = (
    address: string
  ): { isValid: boolean; message: string } => {
    let res = { isValid: false, message: '' };

    try {
      Web3.utils.toChecksumAddress(address);
      res.isValid = true;
    } catch (error) {
      res.isValid = false;
      res.message = 'invalid ethereum address';
    }
    return res;
  };

  const connectWallet = async (e: any) => {
    if (!walletReady) {
      e.preventDefault();
      let error: any;
      try {
        await onboard.walletSelect();
        await onboard.walletCheck();
        setWalletState(true);
      } catch (error) {
        error = error;
      }
    }
  };

  const disconnectWallet = () => {
    onboard.walletReset();
    setWalletState(false);
  };

  return (
    <StyledHome>
      <Head>
        <title>Crowdship - Create Demo</title>
        <meta
          name='description'
          content='Create and test your crowdship demo'
        />
      </Head>
      <main>
        <Flex color='white' minH={'100vh'}>
          <Box
            w='400px'
            display={{ base: 'none', md: 'none', lg: 'block' }}
            bg='yellow.500'
            position='relative'
            overflow='hidden'
            backgroundImage='url(./map-light.svg)'
            backgroundRepeat='no-repeat'
            backgroundSize='1000px'
            backgroundPosition='-290px 80px'
          ></Box>
          <Box
            flex='1'
            bg='yellow.100'
            borderRightWidth='10px'
            borderRightColor='yellow.500'
          >
            <Center>
              <Stack spacing={4} w={'full'} maxW={'xl'} p={6} my={52}>
                <Heading
                  lineHeight={1.1}
                  fontSize={{ base: '2xl', md: '3xl' }}
                  color='black.500'
                >
                  Crowdship
                </Heading>
                <Text color='gray.500'>
                  Generate your crowdship experience invite friends to
                  participate, this demo runs on rinkeby.
                </Text>
                <Spacer />
                <form onSubmit={handleSubmit(createDemo)}>
                  <FormControl
                    isInvalid={!!errors.revenueWallet?.message?.length}
                    isRequired
                  >
                    <FormLabel htmlFor='revenueWallet' color='black'>
                      Revenue Wallet
                    </FormLabel>
                    <Input
                      {...register('revenueWallet')}
                      id='revenueWallet'
                      variant='outlineAlt'
                      size='lg'
                      _placeholder={{ color: 'gray.500' }}
                      placeholder='0x0000000000000000000000000000000000000000'
                    />
                    <FormErrorMessage>
                      {errors.revenueWallet?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Stack mt={4}>
                    <Button
                      onClick={connectWallet}
                      disabled={false}
                      type='submit'
                      variant={walletReady ? 'primary' : 'primaryAlt'}
                      size='lg'
                      leftIcon={
                        walletReady ? (
                          <ChevronRightIcon />
                        ) : (
                          <AddIcon w={3.5} h={3.5} />
                        )
                      }
                    >
                      {walletReady ? 'Proceed' : 'Connect Wallet'}
                    </Button>
                    <Center>
                      {walletReady ? (
                        <Text
                          fontSize='sm'
                          color='blue.500'
                          textDecoration='underline'
                          cursor='pointer'
                          onClick={disconnectWallet}
                        >
                          Disconnect Wallet
                        </Text>
                      ) : (
                        ''
                      )}
                    </Center>
                  </Stack>
                </form>
              </Stack>
            </Center>
          </Box>
        </Flex>
      </main>
    </StyledHome>
  );
};

export default Home;
