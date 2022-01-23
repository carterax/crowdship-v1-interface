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
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputRightElement,
  Circle,
  Divider,
} from '@chakra-ui/react';

import { ChevronRightIcon, AddIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { ArrowCounterClockwise } from 'phosphor-react';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Loading } from '@/components/Loading';
import { onboard, FACTORY } from '@/connectors/onboard';
import { walletStore } from '@/stores';
import { V1_CAMPAIGN_FACTORY_IMPLEMENTATION } from '@/constants/addresses';
import LoadingAnimation from '@/components/lottie/loading.json';

type formData = {
  governance: string;
};

const schema = yup
  .object({
    governance: yup.string().required('Required'),
    governance: yup.string().required('Required'),
    governance: yup.string().required('Required'),
  })
  .required();

const campaignAddresses = [
  {
    key: 'rewardContractAddress',
    title: 'Reward Contract Address',
    description: 'Lorem Ipsum',
    value: 'chehc',
  },
  {
    key: 'requestContractAddress',
    title: 'Request Contract Address',
    description: 'Lorem Ipsum',
    value: 'chehc',
  },
  {
    key: 'voteContractAddress',
    title: 'Vote Contract Address',
    description: 'Lorem Ipsum',
    value: 'chehc',
  },
];

const campaignRules = [
  {
    key: 'defaultCommission',
    title: 'Default commission (%)',
    description: 'Lorem Ipsum',
    value: 2,
  },
  {
    key: 'deadlineStrikesAllowed',
    title: 'Deadline extension threshold',
    description: 'Lorem Ipsum',
    value: 3,
  },
  {
    key: 'minimumContributionAllowed',
    title: 'Minimum contribution',
    description: 'Lorem Ipsum',
    value: 1,
  },
  {
    key: 'maximumContributionAllowed',
    title: 'Maximum contribution',
    description: 'Lorem Ipsum',
    value: 10000,
  },
  {
    key: 'minimumRequestAmountAllowed',
    title: 'Minimum request amount',
    description: 'Lorem Ipsum',
    value: 1000,
  },
  {
    key: 'maximumRequestAmountAllowed',
    title: 'Maximum request amount',
    description: 'Lorem Ipsum',
    value: 5000,
  },
  {
    key: 'minimumCampaignTarget',
    title: 'Minimum campaign target',
    description: 'Lorem Ipsum',
    value: 5000,
  },
  {
    key: 'maximumCampaignTarget',
    title: 'Maximum campaign target',
    description: 'Lorem Ipsum',
    value: 1000000,
  },
  {
    key: 'maxDeadlineExtension',
    title: 'Maximum deadline extension',
    description: 'Lorem Ipsum',
    value: 604800,
  },
  {
    key: 'minDeadlineExtension',
    title: 'Minimum deadline extension',
    description: 'Lorem Ipsum',
    value: 86400,
  },
  {
    key: 'minRequestDuration',
    title: 'Minimum request duration',
    description: 'Lorem Ipsum',
    value: 86400,
  },
  {
    key: 'maxRequestDuration',
    title: 'Maximum request duration',
    description: 'Lorem Ipsum',
    value: 604800,
  },
  {
    key: 'reviewThresholdMark',
    title: 'Review threshold',
    description: 'Lorem Ipsum',
    value: 80,
  },
  {
    key: 'requestFinalizationThreshold',
    title: 'Request finalization threshold',
    description: 'Lorem Ipsum',
    value: 51,
  },
  {
    key: 'reportThresholdMark',
    title: 'Report threshold',
    description: 'Lorem Ipsum',
    value: 51,
  },
];

const Home: NextPage = () => {
  const { address } = useReactiveVar(walletStore);
  const [transactionError, setTransactionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const createDemo = async ({ governance }: formData) => {
    const { isValid, message } = isValidAddress(governance);

    if (isValid) {
      setIsSubmitting(true);
      const { address } = onboard.getState();

      try {
        const rules = [];
        campaignRules.map((rule) => rules.push(rule.value));

        const tx = await FACTORY.methods
          .createCampaignFactory(
            V1_CAMPAIGN_FACTORY_IMPLEMENTATION,
            governance,
            rules
          )
          .send({ from: address });

        await FACTORY.events
          .CampaignFactoryDeployed({}, { fromBlock: tx.blockNumber })
          .on('data', function (event: any) {
            Router.push(`/my-crowdship/${event.returnValues.campaignFactory}`);
          })
          .on('error', (err: any) => {
            setTransactionError(err.message);
            setIsSubmitting(false);
          });
      } catch (error: any) {
        setTransactionError(error.message);
        setIsSubmitting(false);
      }
    } else {
      setError('governance', { type: 'manual', message });
      setIsSubmitting(false);
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
        <Loading
          loading={isSubmitting}
          loadingText='Processing Transaction...'
          loadingAnimation={LoadingAnimation}
        />
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
                    isInvalid={!!errors.governance?.message?.length}
                    isRequired
                  >
                    <FormLabel htmlFor='governance' color='black'>
                      Governance Address
                    </FormLabel>
                    <Input
                      {...register('governance')}
                      id='governance'
                      variant='outlineAlt'
                      size='lg'
                      _placeholder={{ color: 'gray.500' }}
                      placeholder='0x0000000000000000000000000000000000000000'
                    />
                    <FormErrorMessage>
                      {errors.governance?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <Drawer
                      isOpen={isOpen}
                      onClose={onClose}
                      placement='left'
                      size='sm'
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader fontFamily='DM mono'>
                          Advanced Settings
                        </DrawerHeader>
                        <Divider />
                        <DrawerBody>
                          {campaignAddresses.map(
                            ({ key, title, value }, idx) => (
                              <FormControl key={idx} mb='4' mt='4'>
                                <FormLabel htmlFor={key} color='black'>
                                  {title}
                                </FormLabel>
                                <InputGroup size='md'>
                                  <Input
                                    id={key}
                                    variant='outlineAlt'
                                    size='lg'
                                    pr='3rem'
                                    defaultValue={value}
                                    _placeholder={{
                                      color: 'gray.500',
                                    }}
                                    placeholder='0x0000000000000000000000000000000000000000'
                                  />
                                  <InputRightElement
                                    width='3.3rem'
                                    h='full'
                                    onClick={() => {}}
                                  >
                                    <Circle
                                      size='25px'
                                      cursor='pointer'
                                      bg='green.400'
                                      color='white'
                                    >
                                      <ArrowCounterClockwise
                                        color='white'
                                        weight='duotone'
                                      />
                                    </Circle>
                                  </InputRightElement>
                                </InputGroup>

                                <FormErrorMessage>
                                  {errors.governance?.message}
                                </FormErrorMessage>
                              </FormControl>
                            )
                          )}
                          {campaignRules.map(
                            ({ key, title, value, description }) => (
                              <Box
                                key={key}
                                display='flex'
                                alignItems='center'
                                justifyContent='space-between'
                                py={3}
                              >
                                <Box textTransform='capitalize'>{title}</Box>
                                <Box>
                                  <NumberInput
                                    size='sm'
                                    w='120px'
                                    defaultValue={value}
                                  >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </Box>
                              </Box>
                            )
                          )}
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                    <Box display='flex' justifyContent='flex-end' mt={1}>
                      <Box
                        display='flex'
                        alignItems='center'
                        cursor='pointer'
                        padding='0 10px'
                        _active={{
                          background: 'rgba(0, 0, 0, 0.06)',
                          borderRadius: 'sm',
                        }}
                        _hover={{
                          background: 'rgba(0, 0, 0, 0.06)',
                          borderRadius: 'sm',
                        }}
                      >
                        <InfoOutlineIcon color='black' w={3} h={3} mr={1} />
                        <Text fontSize='sm' color='black' onClick={onOpen}>
                          Advanced
                        </Text>
                      </Box>
                    </Box>
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
