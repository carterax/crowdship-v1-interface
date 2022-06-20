import type { NextPage } from 'next';
import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Center,
  Button,
  Flex,
  Stack,
  FormControl,
  Input,
  Textarea,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import slugify from 'slugify';
import Router from 'next/router';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { CheckCircle, Circle, XCircle } from 'phosphor-react';

import { FileUpload } from '@/components/FileUpload';
import { CampaignCard } from '@/components/CampaignCard';
import { RadioGroup } from '@/components/RadioGroup';
import { CategoryIcon } from '@/components/CategoryIcon';

import { useGlobalState } from '@/hooks/globalState';
import { ReducerTypes } from '@/reducer';

import { gun, user } from '@/lib/gun';
import { uploadFile } from '@/lib/xhr/upload-file';

import { useAuthenticate, useWallet } from '@/hooks/web3Onboard';
import { useCampaignFactory } from '@/hooks/contracts';
import useCampaignFactoryAddress from '@/hooks/campaignFactoryAddress';
import { useInjectCrowdshipQuery } from '@/hooks/injectCrowdshipQuery';

import nanoid from '@/utils/nanoid';

const Content = ({
  index,
  activeStep,
  children,
}: {
  index: number;
  activeStep: number;
  children: any;
}) => (
  <Center
    position='relative'
    _after={
      index <= activeStep
        ? {
            content: `""`,
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '8px',
            backgroundColor: '#e9ebed',
          }
        : {}
    }
  >
    {children}
  </Center>
);

type formData = {
  campaignName: string;
  campaignDescription: string;
  campaignCategory: string;
  campaignListing: string;
};

const schema = yup
  .object({
    campaignName: yup.string().trim().required('Required'),
    campaignDescription: yup.string().trim(),
    campaignCategory: yup.string().required('Required'),
    campaignListing: yup.string().required('Required'),
  })
  .required();

const categories = [
  {
    title: 'tech',
    id: '1',
  },
  {
    title: 'sports',
    id: '2',
  },
  {
    title: 'finance',
    id: '3',
  },
  {
    title: 'health',
    id: '4',
  },
  {
    title: 'agriculture',
    id: '5',
  },
  {
    title: 'travel',
    id: '6',
  },
  {
    title: 'others',
    id: '0',
  },
];

const Launch: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState([]);
  const [filePreview, setFilePreview] = useState('');
  const [campaignForm, setCampaignForm] = useState({
    isLoading: false,
    launchButtonText: 'Launch',
    loadingText: null,
  });
  const [transactionError, setTransactionError] = useState('');

  const { dispatch } = useGlobalState();

  const campaignFactoryAddress = useCampaignFactoryAddress();
  const campaignFactory = useCampaignFactory(campaignFactoryAddress);

  const [authenticate, authenticating, authenticated] = useAuthenticate();
  const wallet = useWallet();

  const injectCrowdshipQuery = useInjectCrowdshipQuery();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    trigger,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const watchAllFields = watch();

  const renderCategoryContent = (name: string, icon: ReactNode) => (
    <Box
      display='flex'
      flexDir='column'
      justifyContent='space-between'
      h='full'
      position='relative'
    >
      {watchAllFields.campaignCategory === name ? (
        <Box position='absolute' right='0'>
          <CheckCircle size={20} color='#070702' weight='fill' />
        </Box>
      ) : (
        ''
      )}
      <Box>{icon}</Box>
      <Text fontSize='16px' fontFamily='DM mono' textTransform='capitalize'>
        {name}
      </Text>
    </Box>
  );

  const categoryOptions = [];

  categories.map(({ id, title }) =>
    categoryOptions.push({
      value: id,
      content: renderCategoryContent(
        title,
        <CategoryIcon
          name={title}
          size={40}
          color={watchAllFields.campaignCategory == id ? '#FFD60A' : undefined}
        />
      ),
    })
  );

  const renderListingOptions = (
    name: string,
    description: string,
    field: string
  ) => (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Box>
        <Text fontFamily='DM mono' fontSize='20px' mb={2}>
          {name}
        </Text>
        <Text fontSize='13px'>{description}</Text>
      </Box>
      <Box>
        {watchAllFields.campaignListing === field ? (
          <CheckCircle size={25} color='#FFD60A' weight='fill' />
        ) : (
          <Circle size={25} weight='fill' color='#E2E8F0' />
        )}
      </Box>
    </Box>
  );

  const listingOptions = [
    {
      value: 'public',
      content: renderListingOptions(
        'Make Public',
        'Campaign will show up in campaigns page and anyone can fund',
        'public'
      ),
    },
    {
      value: 'private',
      content: renderListingOptions(
        'Unlisted',
        'Only people who have access to the link can fund campaign',
        'private'
      ),
    },
  ];

  const stepContents = {
    campaignCategory: (
      <Stack spacing={4} w={'full'} maxW={'3xl'} p={6}>
        <RadioGroup
          name='campaignCategory'
          control={control}
          label={() => (
            <>
              How would you categorize <br /> your campaign?
            </>
          )}
          options={categoryOptions}
          isRequired
          columns={[2, 3, 4]}
          spacing={5}
          style={{
            borderRadius: 'xl',
            color: 'blackAlpha.700',
            width: '150px',
            height: '150px',
            bg: 'white',
            border: 'none',
            p: 4,
            mb: 4,
            boxShadow:
              '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            _hover: {
              boxShadow:
                '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            _checked: {
              bg: 'yellow.100',
              borderColor: '',
              border: '1px solid #F6E05E',
              boxShadow:
                '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
          }}
        />
      </Stack>
    ),
    campaignName: (
      <Box>
        <Stack spacing={4} w={'full'} maxW={'lg'} p={6}>
          <FormControl
            pb='51px'
            isInvalid={!!errors.campaignName?.message?.length}
            isRequired
          >
            <FormLabel
              htmlFor='campaignName'
              color='black'
              fontFamily='DM mono'
              fontSize='24px'
              lineHeight='120%'
            >
              Name your <br />
              campaign
            </FormLabel>
            <Text color='gray.600' mb={3}>
              Something memorable
            </Text>
            <Input
              {...register('campaignName', {
                validate: (value) => {
                  return !!value.trim();
                },
              })}
              id='campaignName'
              variant='outline'
              size='lg'
              _placeholder={{ color: 'gray.500' }}
              placeholder='e.g Air Fryer For Campers'
            />
            <FormErrorMessage>{errors.campaignName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            pb='51px'
            isInvalid={!!errors.campaignDescription?.message?.length}
          >
            <FormLabel
              htmlFor='campaignDescription'
              color='black'
              fontFamily='DM mono'
              fontSize='24px'
              lineHeight='120%'
            >
              Tell us a <br />
              little bit more
            </FormLabel>
            <Text color='gray.600' mb={3}>
              In a few words describe your product
            </Text>
            <Textarea
              {...register('campaignDescription')}
              id='campaignDescription'
              variant='outline'
              size='lg'
              _placeholder={{ color: 'gray.500' }}
              placeholder='Here is a sample placeholder'
            />
            <FormErrorMessage>
              {errors.campaignDescription?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor=''
              color='black'
              fontFamily='DM mono'
              fontSize='24px'
              lineHeight='120%'
            >
              An image speaks <br /> louder than words
            </FormLabel>
            <Text color='gray.600' mb={3}>
              Your image should be at least <code>1024 x 576</code> pixels and{' '}
              <code>2MB</code> size max
            </Text>
            <FileUpload
              name='campaignPreview'
              setFile={(files) => {
                setFile(files);
                if (files.length) {
                  setFilePreview(URL.createObjectURL(files[0].file));
                } else {
                  setFilePreview('');
                }
              }}
              file={file}
            />
          </FormControl>
        </Stack>
      </Box>
    ),
    campaignListing: (
      <Stack spacing={4} w={'full'} maxW={'3xl'} p={6}>
        <RadioGroup
          name='campaignListing'
          control={control}
          label={() => (
            <>
              Big decision, but <br /> you can change <br /> anytime.
            </>
          )}
          options={listingOptions}
          isRequired
          columns={1}
          spacing={5}
          style={{
            width: '100%',
            borderWidth: '1px',
            borderRadius: 'xl',
            borderColor: 'blackAlpha.200',
            color: 'blackAlpha.700',
            height: '100px',
            bg: 'white',
            p: 4,
            mb: 4,
            _checked: {
              bg: 'yellow.100',
              borderColor: '',
              border: '1px solid #F6E05E',
            },
          }}
        />
      </Stack>
    ),
  };

  const steps = [
    {
      header: (
        <Image
          src='/images/logo-single.svg'
          width='73'
          height='61'
          alt='Crowdship'
        />
      ),
      content: stepContents['campaignCategory'],
      fields: ['campaignCategory'],
    },
    {
      header: (
        <Text fontWeight='500' fontFamily='DM Mono' fontSize='20px'>
          Step {activeStep + 1} of 3
        </Text>
      ),
      content: stepContents['campaignName'],
      fields: ['campaignName'],
    },
    {
      header: (
        <Text
          fontWeight='500'
          fontFamily='DM Mono'
          cursor='pointer'
          fontSize='20px'
        >
          Cancel
        </Text>
      ),
      content: stepContents['campaignListing'],
      fields: ['campaignListing'],
    },
  ];

  const setProfileDrawerLoading = (loading: boolean) => {
    dispatch({
      type: ReducerTypes.TOGGLE_NOTIFICATION_LOADING,
      payload: {
        notification: {
          loading,
        },
      },
    });
  };

  const createProfile = async (user: any) => {
    setProfileDrawerLoading(true);

    await campaignFactory
      .signUp(user.is.alias)
      .then(() => {
        dispatch({
          type: ReducerTypes.TOGGLE_NOTIFICATION,
          payload: {
            notification: {
              type: 'success',
              isOpen: true,
              title: 'Huzzah! Your profile was much success.',
              showButton: false,
            },
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: ReducerTypes.TOGGLE_NOTIFICATION,
          payload: {
            notification: {
              type: 'error',
              isOpen: true,
              title: err.error.message,
              icon: <XCircle color='#FFFFFF' size={25} />,
              buttonText: 'Try again',
              buttonAction: async () => createProfile(user),
            },
          },
        });
      })
      .finally(() => {
        setProfileDrawerLoading(false);
      });
  };

  const nextStep = async () => {
    const fields = steps[activeStep].fields;

    if (activeStep !== steps.length - 1) {
      if (activeStep === 2 && watchAllFields.campaignListing === 'public') {
        !fields.includes('campaignDescription')
          ? fields.push('campaignDescription')
          : fields.filter((x) => x !== 'campaignDescription');
      }

      const result = await trigger(fields as []);
      if (result) setActiveStep(activeStep + 1);
    } else {
      const result = await trigger();

      if (!result) return;

      try {
        if (!authenticated) await authenticate();

        setCampaignForm({
          ...campaignForm,
          isLoading: true,
          loadingText: 'Launching...',
        });

        if (!campaignFactory) throw new Error('Campaign factory not found');

        const userExists = await campaignFactory.userExists(
          wallet?.accounts?.[0]?.address
        );

        if (userExists) {
          launchCampaign(user);
        } else {
          setCampaignForm({
            ...campaignForm,
            isLoading: false,
          });

          // ask user to create a profile
          dispatch({
            type: ReducerTypes.TOGGLE_NOTIFICATION,
            payload: {
              notification: {
                isOpen: true,
                type: 'info',
                title: "Seems like you don't have a profile yet.",
                buttonText: "Let's do it!",
                showButton: true,
                buttonAction: async () => createProfile(user),
              },
            },
          });
        }
      } catch (err) {
        dispatch({
          type: ReducerTypes.TOGGLE_NOTIFICATION,
          payload: {
            notification: {
              type: 'error',
              isOpen: true,
              title: err.message,
              showButton: false,
            },
          },
        });
        setCampaignForm({
          ...campaignForm,
          isLoading: false,
        });
      }
    }
  };

  const goToHome = () => {
    console.log('Home');
  };

  const launchCampaign = async (user: any) => {
    const {
      campaignName,
      campaignDescription,
      campaignCategory,
      campaignListing,
    } = watchAllFields;
    const isPrivateCampaign = campaignListing === 'private';
    let cid = null;

    if (file.length) {
      // store image to ipfs
      const formData = new FormData();
      formData.append('campaignPreview', file[0].file, file[0].file.name);

      try {
        cid = await uploadFile(formData, '/api/upload', 'POST');
      } catch (error) {
        setTransactionError(error.response);
        setCampaignForm({
          ...campaignForm,
          isLoading: false,
        });
        return;
      }
    }

    // save to gun db
    const _id = nanoid();
    const campaignSlug = slugify(campaignName, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    const campaign = user.get(_id).put({
      uuid: _id,
      name: campaignName,
      slug: campaignSlug,
      description: campaignDescription,
      thumbnail: cid ? cid.response : '',
      category: campaignCategory,
      private: isPrivateCampaign,
    });
    gun.get('campaigns').set(campaign);

    try {
      // save to contract
      await campaignFactory.createCampaign(
        campaignCategory,
        isPrivateCampaign,
        _id
      );

      campaignFactory.on('CampaignDeployed', (_campaignFactory) => {
        const campaignUrl = injectCrowdshipQuery(
          `/campaign/${_id}/${campaignSlug}`
        );
        Router.push(campaignUrl);
      });
    } catch (error) {
      setTransactionError(error);
      setCampaignForm({
        ...campaignForm,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {});

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(filePreview);
    },
    [file]
  );

  useEffect(() => {
    setCampaignForm({
      ...campaignForm,
      isLoading: authenticating,
      loadingText: 'Connecting...',
    });
  }, [authenticating]);

  return (
    <>
      <Box
        _after={{
          content: `""`,
          position: 'fixed',
          backgroundImage: 'url(/images/map-light.svg)',
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat',
          opacity: '0.2',
          height: '100%',
          width: '100%',
          top: '90px',
          right: '-200px',
          zIndex: '-1',
        }}
      >
        <SimpleGrid
          position='fixed'
          top='0'
          width='100%'
          columns={3}
          spacing={0}
          bg='gray.50'
          height='71px'
          borderBottom='1px solid'
          borderBottomColor='blackAlpha.400'
          zIndex={3}
        >
          {steps.map(({ header }, idx) => (
            <Content key={idx} index={idx} activeStep={activeStep}>
              {header}
            </Content>
          ))}
        </SimpleGrid>
        <Container maxW='container.xl' mt='100px' position='relative'>
          <Box display='flex' justifyContent='space-between'>
            <Box w='100%'>
              <form>
                {transactionError && (
                  <Stack spacing={4} w={'full'} maxW={'3xl'} p={6}>
                    <Alert status='error' variant='solid' bg='red.500'>
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
                  </Stack>
                )}
                {steps[activeStep].content}
                <Flex as='footer' maxW='sm' flexDir='column' width='100%' p={6}>
                  <Flex width='100%' justify='flex-start'>
                    <Button
                      mr={4}
                      variant='plain'
                      fontWeight='500'
                      onClick={() =>
                        activeStep !== 0
                          ? setActiveStep(activeStep - 1)
                          : goToHome()
                      }
                      width='100px'
                      leftIcon={
                        activeStep !== 0 ? (
                          <ArrowBackIcon />
                        ) : (
                          <Box as='span' display='none'></Box>
                        )
                      }
                    >
                      {activeStep === 0 ? 'Cancel' : 'Back'}
                    </Button>
                    <Button
                      variant='secondary'
                      fontWeight='500'
                      width='100%'
                      isLoading={campaignForm.isLoading}
                      loadingText={campaignForm.loadingText}
                      onClick={nextStep}
                    >
                      {activeStep === steps.length - 1
                        ? campaignForm.launchButtonText
                        : 'Next'}
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </Box>
            <Box
              position='sticky'
              top='120px'
              right='100px'
              display='flex'
              justifyContent='flex-end'
              w='50%'
            >
              <CampaignCard
                image={filePreview}
                heading={watchAllFields.campaignName}
                body={watchAllFields.campaignDescription}
                category={
                  categories.filter(
                    (category) =>
                      category.id === watchAllFields.campaignCategory
                  )[0]?.title
                }
                raised='0'
                target=''
                style={{
                  boxShadow: '0 1rem 3rem rgba(0,0,0,.175)',
                  position: 'fixed',
                  top: '130px',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Launch;
