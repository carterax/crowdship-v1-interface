import type { NextPage } from 'next';
import { useState } from 'react';
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
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import Lottie from 'lottie-react';

import { ChevronRightIcon, AddIcon } from '@chakra-ui/icons';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ModalDialog } from '@/components/ModalDialog';
import { onboard, FACTORY } from '@/connectors';
import { walletStore } from '@/stores';
import { V1_CAMPAIGN_FACTORY_IMPLEMENTATION } from '@/constants/addresses';
import Loading from '@/components/lottie/loading.json';

type formData = {
  revenueWallet: string;
};

const schema = yup
  .object({
    revenueWallet: yup.string().required('Required'),
  })
  .required();

const Home: NextPage = () => {
  const { address } = useReactiveVar(walletStore);
  const [transactionError, setTransactionError] = useState('');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

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
          .on('error', (err: any) => setTransactionError(err.message));
      } catch (error: any) {
        setTransactionError(error.message);
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
    if (!address) {
      e.preventDefault();
      let error: any;
      try {
        await onboard.walletSelect();
        await onboard.walletCheck();
      } catch (error) {
        error = error;
      }
    }
  };

  const disconnectWallet = () => {
    onboard.walletReset();
  };

  return (
    <>
      <Head>
        <title>Crowdship - Create Demo</title>
        <meta
          name='description'
          content='Create and test your crowdship demo'
        />
      </Head>
      <main>
        <ModalDialog
          isCentered
          backgroundColor='transparent'
          boxShadow='none'
          closeOnEsc={false}
          closeOnOverlayClick={false}
          size='full'
          onClose={null}
          overlayBgColor='blackAlpha.800'
          isOpen={isSubmitting && isValid}
        >
          <Box
            minH='90vh'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
          >
            <Box w='xs' mb={-5}>
              <Lottie animationData={Loading} />
            </Box>
            <Box>
              <Heading color='white'>Processing Transaction</Heading>
            </Box>
          </Box>
        </ModalDialog>
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
                  {transactionError && (
                    <Alert status='error' variant='solid' bg='red.500' mb={3}>
                      <AlertIcon />
                      <AlertDescription>{transactionError}</AlertDescription>
                      <CloseButton
                        position='absolute'
                        right='8px'
                        top='8px'
                        _focus={{ boxShadow: 'none' }}
                        onClick={() => setTransactionError('')}
                      />
                    </Alert>
                  )}
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
                      disabled={isSubmitting}
                      type='submit'
                      variant={address ? 'primary' : 'primaryAlt'}
                      size='lg'
                      leftIcon={
                        address ? (
                          <ChevronRightIcon />
                        ) : (
                          <AddIcon w={3.5} h={3.5} />
                        )
                      }
                    >
                      {address ? 'Proceed' : 'Connect Wallet'}
                    </Button>
                    <Center>
                      {address ? (
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
    </>
  );
};

export default Home;
