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
} from '@chakra-ui/react';
import Upload from 'rc-upload';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { CheckCircle, Circle } from 'phosphor-react';

import { CampaignCard } from '@/components/CampaignCard';
import { RadioGroup } from '@/components/RadioGroup';
import { CategoryIcon } from '@/components/CategoryIcon';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
    campaignDescription: yup
      .string()
      .trim()
      .when('campaignListing', {
        is: (val: string) => 'public',
        then: yup.string().required('Required'),
      }),
    campaignCategory: yup.string().required('Required'),
    campaignListing: yup.string().required('Required'),
  })
  .required();

const Launch: NextPage = () => {
  const [activeStep, setActiveStep] = useState(0);

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
      <Text fontSize='16px' fontFamily='DM mono'>
        {name}
      </Text>
    </Box>
  );

  const categoryOptions = [
    {
      value: 'Tech',
      content: renderCategoryContent(
        'Tech',
        <CategoryIcon
          name='tech'
          size={40}
          color={
            watchAllFields.campaignCategory == 'Tech' ? '#FFD60A' : undefined
          }
        />
      ),
    },
    {
      value: 'Sports',
      content: renderCategoryContent(
        'Sports',
        <CategoryIcon
          name='sports'
          size={40}
          color={
            watchAllFields.campaignCategory == 'Sports' ? '#FFD60A' : undefined
          }
        />
      ),
    },
    {
      value: 'Finance',
      content: renderCategoryContent(
        'Finance',
        <CategoryIcon
          name='finance'
          size={40}
          color={
            watchAllFields.campaignCategory == 'Finance' ? '#FFD60A' : undefined
          }
        />
      ),
    },
    {
      value: 'Health',
      content: renderCategoryContent(
        'Health',
        <CategoryIcon
          name='health'
          size={40}
          color={
            watchAllFields.campaignCategory == 'Health' ? '#FFD60A' : undefined
          }
        />
      ),
    },
    {
      value: 'Agriculture',
      content: renderCategoryContent(
        'Agriculture',
        <CategoryIcon
          name='agriculture'
          size={40}
          color={
            watchAllFields.campaignCategory == 'Agriculture'
              ? '#FFD60A'
              : undefined
          }
        />
      ),
    },
    {
      value: 'Travel',
      content: renderCategoryContent(
        'Travel',
        <CategoryIcon
          name='travel'
          size={40}
          color={
            watchAllFields.campaignCategory == 'Travel' ? '#FFD60A' : undefined
          }
        />
      ),
    },
  ];

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

  const uploadProps = {
    action: (data: any) => {
      console.log(data);
      return '';
    },
    multiple: false,
    onStart(file: any) {
      console.log('onStart', file, file.name);
    },
    onSuccess(ret: any) {
      console.log('onSuccess', ret);
    },
    onError(err: any) {
      console.log('onError', err);
    },
  };

  const steps = [
    {
      header: (
        <Image src='/logo-single.svg' width='73' height='61' alt='Crowdship' />
      ),
      content: (
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
              transition: 'all ease-in 100ms',
              _checked: {
                bg: 'yellow.100',
                borderColor: '',
                border: '1px solid #F6E05E',
              },
            }}
          />
        </Stack>
      ),
      fields: ['campaignListing'],
    },
    {
      header: (
        <Text fontWeight='500' fontFamily='DM Mono' fontSize='20px'>
          Step {activeStep + 1} of 3
        </Text>
      ),
      content: (
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
              <FormErrorMessage>
                {errors.campaignName?.message}
              </FormErrorMessage>
            </FormControl>
            {watchAllFields.campaignListing === 'public' ? (
              <FormControl
                pb='51px'
                isInvalid={!!errors.campaignDescription?.message?.length}
                isRequired
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
            ) : null}
            <FormControl>
              <Upload {...uploadProps}>
                <Box>Upload</Box>
              </Upload>
            </FormControl>
          </Stack>
        </Box>
      ),
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
      content: (
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
              transition: 'all ease-in 100ms',
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
      fields: ['campaignCategory'],
    },
  ];

  const nextStep = async () => {
    const fields = steps[activeStep].fields;

    if (activeStep !== steps.length - 1) {
      if (activeStep === 1 && watchAllFields.campaignListing === 'public') {
        !fields.includes('campaignDescription')
          ? fields.push('campaignDescription')
          : fields.filter((x) => x !== 'campaignDescription');
      }

      const result = await trigger(fields as []);
      if (result) setActiveStep(activeStep + 1);
    } else {
      goToCampaign();
    }
  };

  const goToHome = () => {
    console.log('Home');
  };

  const goToCampaign = () => {
    console.log('Campaign');
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'campaignListing' && value.campaignListing === 'private')
        setValue('campaignDescription', '');
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Box
        _after={{
          content: `""`,
          position: 'fixed',
          backgroundImage: 'url(/map-light.svg)',
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
          zIndex='999'
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
                      onClick={nextStep}
                    >
                      {activeStep === steps.length - 1
                        ? 'Launch Campaign'
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
              zIndex='99'
              justifyContent='flex-end'
              w='50%'
            >
              <CampaignCard
                heading={watchAllFields.campaignName}
                body={watchAllFields.campaignDescription}
                category={watchAllFields.campaignCategory}
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
