import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { formatMoney } from 'accounting';
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
  NumberInput,
  NumberInputField,
  Stack,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Divider,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { isAddress } from '@ethersproject/address';

import { ChevronRightIcon, AddIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Lightning, ArrowCounterClockwise } from 'phosphor-react';

import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useGlobalState } from '@/hooks/globalState';
import { useAuthenticate, useLogout } from '@/hooks/web3Onboard';
import { useContractAddress, useFactory } from '@/hooks/contracts';

import { ReducerTypes } from '@/reducer';

type formData = {
  governance: string;
  campaignConfig: Array<{
    key: string;
    value: string | number | Array<number>;
  }>;
};

const schema = yup
  .object({
    governance: yup.string().required('Required'),
    campaignConfig: yup.array().of(
      yup.object().shape({
        value: yup.lazy((val) =>
          Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()
        ),
        key: yup.string(),
      })
    ),
  })
  .required();

const campaignConfig = [
  {
    title: 'Campaign Contract Address',
    description: 'Lorem Ipsum',
    suffix: null,
  },
  {
    title: 'Request Contract Address',
    description: 'Lorem Ipsum',
    suffix: null,
  },
  {
    title: 'Vote Contract Address',
    description: 'Lorem Ipsum',
    suffix: null,
  },
  {
    title: 'Reward Contract Address',
    description: 'Lorem Ipsum',
    suffix: null,
  },
  {
    title: 'Default commission',
    description: 'Lorem Ipsum',
    suffix: '%',
  },
  {
    title: 'Deadline extension threshold',
    description: 'Lorem Ipsum',
    suffix: null,
  },
  {
    title: 'Contribution range',
    description: 'Lorem Ipsum',
    suffix: '$',
  },
  {
    title: 'Request amount range',
    description: 'Lorem Ipsum',
    suffix: '$',
  },
  {
    title: 'Campaign target range',
    description: 'Lorem Ipsum',
    suffix: '$',
  },
  {
    title: 'Deadline extension range',
    description: 'Lorem Ipsum',
    suffix: 'secs',
  },
  {
    title: 'Request duration range',
    description: 'Lorem Ipsum',
    suffix: 'secs',
  },
  {
    title: 'Review threshold',
    description: 'Lorem Ipsum',
    suffix: '%',
  },
  {
    title: 'Request finalization threshold',
    description: 'Lorem Ipsum',
    suffix: '%',
  },
  {
    title: 'Report threshold',
    description: 'Lorem Ipsum',
    suffix: '%',
  },
];

const Home: NextPage = (props) => {
  const [authenticate, authenticating, authenticated] = useAuthenticate();
  const logout = useLogout();

  const contractAddress = useContractAddress();
  const factoryAddress = contractAddress('factoryImplementation');
  const campaignFactoryAddress = contractAddress(
    'campaignFactoryImplementation'
  );
  const campaignAddress = contractAddress('campaignImplementation');
  const campaignRequestAddress = contractAddress(
    'campaignRequestImplementation'
  );
  const campaignRewardAddress = contractAddress('campaignRewardImplementation');
  const campaignVoteAddress = contractAddress('campaignVoteImplementation');
  const factory = useFactory(factoryAddress);

  const campaignConfigValues = [
    {
      key: 'campaignContractAddress',
      value: campaignAddress,
    },
    {
      key: 'requestContractAddress',
      value: campaignRequestAddress,
    },
    {
      key: 'voteContractAddress',
      value: campaignVoteAddress,
    },
    {
      key: 'rewardContractAddress',
      value: campaignRewardAddress,
    },
    {
      key: 'defaultCommission',
      value: 2,
    },
    {
      key: 'deadlineStrikesAllowed',
      value: 3,
    },
    {
      key: 'contributionAllowed',
      value: [1, 100000],
    },
    {
      key: 'requestAmountAllowed',
      value: [1000, 50000],
    },
    {
      key: 'campaignTarget',
      value: [5000, 1000000],
    },
    {
      key: 'deadlineExtension',
      value: [1, 14],
    },
    {
      key: 'requestDuration',
      value: [1, 14],
    },
    {
      key: 'reviewThresholdMark',
      value: 80,
    },
    {
      key: 'requestFinalizationThreshold',
      value: 51,
    },
    {
      key: 'reportThresholdMark',
      value: 51,
    },
  ];

  const timeFields = ['deadlineExtension', 'requestDuration'];

  const [transactionError, setTransactionError] = useState<string>('');
  const { state, dispatch } = useGlobalState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    watch,
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    defaultValues: {
      campaignConfig: campaignConfigValues,
    },
  });

  useEffect(() => {
    if (authenticated) reset({ campaignConfig: campaignConfigValues });
  }, [authenticated, authenticating]);

  const { fields } = useFieldArray({
    control,
    name: 'campaignConfig',
    keyName: 'key',
  });

  const watchAllFields = watch();

  const isSubmitting = (isLoading: boolean) => {
    dispatch({
      type: ReducerTypes.SET_LOADING,
      payload: {
        loading: {
          isLoading,
          loadingText: 'Processing...',
        },
      },
    });
  };

  const createDemo = async ({ governance, campaignConfig }: formData) => {
    const { isValid, message } = isValidAddress(governance);

    if (isValid) {
      isSubmitting(true);

      if (authenticated) {
        const config = [];

        campaignConfig.map(({ key, value }, idx) => {
          if (idx > 3) {
            if (timeFields.includes(key)) {
              value[0] = value[0] * 86400;
              value[1] = value[1] * 86400;
            }

            if (Array.isArray(value)) {
              value.map((v) => config.push(Number(v)));
            } else {
              config.push(Number(value));
            }
          }
        });

        await factory
          .createCampaignFactory(
            campaignFactoryAddress,
            campaignConfig[0].value as string,
            campaignConfig[1].value as string,
            campaignConfig[2].value as string,
            campaignConfig[3].value as string,
            governance,
            config
          )
          .then(async () => {
            factory.on('CampaignFactoryDeployed', (campaignFactory) => {
              isSubmitting(false);
              Router.push(`/?myCrowdship=${campaignFactory}`);
            });
          })
          .catch((err) => {
            setTransactionError(err.message);
            isSubmitting(false);
          });
      }
    } else {
      setError('governance', { type: 'manual', message });
      isSubmitting(false);
    }
  };

  const isValidAddress = (
    address: string
  ): { isValid: boolean; message: string } => {
    let res = { isValid: false, message: '' };

    return !isAddress(address)
      ? { ...res, message: 'Invalid address' }
      : { ...res, isValid: true };
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {});

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Head>
        <title>Crowdship - Create Demo</title>
        <meta
          name='description'
          content='Create and test your crowdship demo'
        />
      </Head>
      <Flex color='white' minH={'100vh'}>
        <Box
          w='400px'
          display={{ base: 'none', md: 'none', lg: 'block' }}
          bg='yellow.500'
          position='relative'
          overflow='hidden'
          backgroundImage='url(./images/map-light.svg)'
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
                    size='lg'
                  >
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton top='16px' />
                      <DrawerHeader fontFamily='DM mono'>
                        Advanced Settings
                      </DrawerHeader>
                      <Divider />
                      <DrawerBody>
                        {fields.map((field, idx) => {
                          const renderConfigField = (index) => (
                            <InputGroup size='md'>
                              <NumberInput
                                value={
                                  !timeFields.includes(field.key)
                                    ? formatMoney(
                                        watchAllFields.campaignConfig[idx]
                                          .value[index],
                                        {
                                          symbol: '',
                                          precision: 0,
                                        }
                                      )
                                    : watchAllFields.campaignConfig[idx].value[
                                        index
                                      ]
                                }
                                onChange={(value) => {
                                  let currentValues =
                                    watchAllFields.campaignConfig[idx].value;

                                  currentValues[index] = value;

                                  setValue(
                                    `campaignConfig.${idx}.value`,
                                    currentValues
                                  );
                                }}
                                variant='outlineAlt'
                                size='lg'
                              >
                                <NumberInputField textAlign='center' />
                              </NumberInput>
                              {timeFields.includes(field.key) ? (
                                <InputRightElement h='full'>
                                  <Text mr='6'>days</Text>
                                </InputRightElement>
                              ) : (
                                <InputLeftElement h='full'>
                                  <Text>$</Text>
                                </InputLeftElement>
                              )}
                            </InputGroup>
                          );

                          switch (typeof field.value) {
                            case 'string':
                              return (
                                <FormControl key={idx} py={2} mb={2}>
                                  <FormLabel
                                    htmlFor={`campaignConfig.${idx}`}
                                    color='black'
                                  >
                                    {campaignConfig[idx].title}
                                  </FormLabel>
                                  <Input
                                    key={field.key}
                                    id={`campaignConfig.${idx}`}
                                    {...register(`campaignConfig.${idx}.value`)}
                                    variant='outlineAlt'
                                    size='lg'
                                    _placeholder={{
                                      color: 'gray.500',
                                    }}
                                    placeholder='0x0000000000000000000000000000000000000000'
                                  />
                                </FormControl>
                              );
                              break;

                            case 'number':
                              return (
                                <Box key={idx} py={2} mb={2}>
                                  <Text
                                    textTransform='capitalize'
                                    fontWeight='500'
                                    fontSize='1rem'
                                    pb='1'
                                  >
                                    {campaignConfig[idx].title}
                                  </Text>
                                  <Box
                                    display='flex'
                                    justifyContent='space-between'
                                  >
                                    <Slider
                                      flex='1'
                                      focusThumbOnChange={false}
                                      min={1}
                                      max={100}
                                      value={
                                        watchAllFields.campaignConfig[idx]
                                          .value as number
                                      }
                                      onChange={(e) => {
                                        setValue(
                                          `campaignConfig.${idx}.value`,
                                          e
                                        );
                                      }}
                                    >
                                      <SliderTrack bg='green.100'>
                                        <SliderFilledTrack bg='green.400' />
                                      </SliderTrack>
                                      <SliderThumb boxSize={7}>
                                        <Lightning
                                          size={16}
                                          weight='duotone'
                                          color='#48BB78'
                                        />
                                      </SliderThumb>
                                    </Slider>
                                    <InputGroup size='md' w='150px' ml='6'>
                                      <NumberInput
                                        value={`${watchAllFields.campaignConfig[idx].value}`}
                                        variant='outlineAlt'
                                        size='lg'
                                        onChange={(val) => {
                                          setValue(
                                            `campaignConfig.${idx}.value`,
                                            val
                                          );
                                        }}
                                      >
                                        <NumberInputField textAlign='center' />
                                      </NumberInput>
                                      {field.key !==
                                      'deadlineStrikesAllowed' ? (
                                        <InputRightElement h='full'>
                                          <Text fontWeight='500'>%</Text>
                                        </InputRightElement>
                                      ) : null}
                                    </InputGroup>
                                  </Box>
                                </Box>
                              );
                              break;

                            case 'object':
                              return (
                                <Box key={idx} py={2} mb={2}>
                                  <Text
                                    textTransform='capitalize'
                                    fontWeight='500'
                                    fontSize='1rem'
                                    pb='2'
                                  >
                                    {campaignConfig[idx].title}
                                  </Text>
                                  <Box display='flex'>
                                    {renderConfigField(0)}
                                    <RangeSlider
                                      aria-label={['min', 'max']}
                                      value={
                                        watchAllFields.campaignConfig[idx]
                                          .value as number[]
                                      }
                                      max={
                                        timeFields.includes(field.key)
                                          ? 31
                                          : 3000000
                                      }
                                      min={1}
                                      mx={6}
                                      onChange={(e) => {
                                        setValue(
                                          `campaignConfig.${idx}.value`,
                                          e
                                        );
                                      }}
                                    >
                                      <RangeSliderTrack bg='green.100'>
                                        <RangeSliderFilledTrack bg='green.400' />
                                      </RangeSliderTrack>
                                      <RangeSliderThumb boxSize={7} index={0}>
                                        <Lightning
                                          size={16}
                                          weight='duotone'
                                          color='#48BB78'
                                        />
                                      </RangeSliderThumb>
                                      <RangeSliderThumb boxSize={7} index={1}>
                                        <Lightning
                                          size={16}
                                          weight='duotone'
                                          color='#48BB78'
                                        />
                                      </RangeSliderThumb>
                                    </RangeSlider>
                                    {renderConfigField(1)}
                                  </Box>
                                </Box>
                              );
                              break;

                            default:
                              break;
                          }
                        })}
                      </DrawerBody>
                      <DrawerFooter>
                        <Button
                          onClick={() => reset()}
                          variant='primary'
                          w='full'
                          size='lg'
                          leftIcon={<ArrowCounterClockwise />}
                        >
                          Reset Values
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  <Box
                    display='flex'
                    justifyContent='flex-end'
                    mt={1}
                    onClick={onOpen}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      cursor='pointer'
                      padding='5px 10px'
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
                      <Text fontSize='sm' color='black'>
                        Advanced
                      </Text>
                    </Box>
                  </Box>
                </FormControl>
                <Stack mt={4}>
                  <Button
                    onClick={!authenticated ? authenticate : undefined}
                    disabled={state.loading.isLoading || authenticating}
                    type={authenticated ? 'submit' : null}
                    variant={authenticated ? 'primary' : 'primaryAlt'}
                    isLoading={authenticating}
                    loadingText={
                      !state.loading.isLoading
                        ? 'Connecting...'
                        : 'Deploying...'
                    }
                    size='lg'
                    leftIcon={
                      authenticated ? (
                        <ChevronRightIcon />
                      ) : (
                        <AddIcon w={3.5} h={3.5} />
                      )
                    }
                  >
                    {authenticated ? 'Proceed' : 'Connect Wallet'}
                  </Button>
                  <Center>
                    {authenticated ? (
                      <Text
                        fontSize='sm'
                        color='blue.500'
                        textDecoration='underline'
                        cursor='pointer'
                        onClick={logout}
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
    </>
  );
};

export default Home;
