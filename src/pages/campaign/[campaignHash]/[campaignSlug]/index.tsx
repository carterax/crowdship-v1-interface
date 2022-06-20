import { Trans } from '@lingui/macro';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect, useState, ReactNode } from 'react';
import {
  Box,
  Text,
  Badge,
  Button,
  Heading,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useTab,
  useStyleConfig,
  Tooltip,
  Container,
} from '@chakra-ui/react';

import { Gallery } from '@/components/Gallery';
import {
  Details,
  Milestones,
  Governance,
  Discussions,
  Faq,
} from '@/components/CampaignTabs';
import AdvancedMenu from '@/components/AdvancedMenu';

import { gun } from '@/lib/gun';

import {
  DotsThree,
  BookmarkSimple,
  Gift,
  PencilSimpleLine,
  Sword,
  Receipt,
  FacebookLogo,
  TwitterLogo,
  LinkSimple,
} from 'phosphor-react';

import { Hero } from '@/components/Hero';

import BusdIcon from '@/public/images/busd.svg';
import UsdtIcon from '@/public/images/usdt.svg';
import PaxIcon from '@/public/images/pax.svg';
import UsdcIcon from '@/public/images/usdc.svg';
import DaiIcon from '@/public/images/dai.svg';

import useCampaignFactoryAddress from '@/hooks/campaignFactoryAddress';
import { useCampaignFactory } from '@/hooks/contracts';

const tabs = [
  {
    label: 'Details',
    badge: null,
    href: 'details',
  },
  {
    label: 'Milestones',
    badge: '30',
    href: 'milestones',
  },
  {
    label: 'Governance',
    badge: '10',
    href: 'governance',
  },
  {
    label: 'Discussions',
    badge: '304',
    href: 'discussions',
  },
  {
    label: 'FAQ',
    badge: '5',
    href: 'faq',
  },
];

const faqs = [
  {
    question: 'What is a Crowdsale?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    question: 'How do I create a Crowdsale?',
    answer:
      'You can create a Crowdsale by clicking the "Create Campaign" button on the left side of the page.',
  },
  {
    question: 'How do I edit a Crowdsale?',
    answer:
      'You can edit a Crowdsale by clicking the "Edit Campaign" button on the left side of the page.',
  },
  {
    question: 'How do I delete a Crowdsale?',
    answer:
      'You can delete a Crowdsale by clicking the "Delete Campaign" button on the left side of the page.',
  },
  {
    question: 'How do I view a Crowdsale?',
    answer:
      'You can view a Crowdsale by clicking the "View Campaign" button on the left side of the page.',
  },
];

const CustomTab = (props) => {
  const tabProps = useTab(props);
  const { pathname, query } = useRouter();

  const styles = useStyleConfig('Tab');

  return (
    <Link
      href={{
        pathname: pathname,
        query: {
          ...query,
          tab: props.href,
        },
      }}
      replace
      passHref
      scroll={false}
    >
      <Box as='a' {...tabProps} sx={styles}>
        {tabProps.children}
      </Box>
    </Link>
  );
};

const Campaign: NextPage = (props) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  const renderTabs = (): ReactNode[] => {
    return tabs.map(({ label, badge, href }, idx) => (
      <CustomTab
        key={label}
        href={href}
        padding='20px 30px'
        _selected={{
          borderBottomWidth: '4px',
          borderBottomColor: 'purple.500',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Text mr='3'>{label}</Text>
          {badge && badge.length && (
            <Badge
              bg={tabIndex === idx ? 'purple.500' : 'blackAlpha.200'}
              color={tabIndex === idx ? 'white' : 'black'}
              borderRadius='xl'
              p='0px 10px'
            >
              {badge}
            </Badge>
          )}
        </Box>
      </CustomTab>
    ));
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    gun
      .get('campaigns')
      .map()
      .once((data) => {
        if (data) {
          // console.log('data', data);
          // merge data from campaign factory with data from gun
          // campaignProps = { ...data, ...campaignProps };
        }
      });
  }, []);

  useEffect(() => {
    const { tab } = router.query;
    if (tab) {
      setTabIndex(tabs.findIndex((t) => t.href === tab));
    }
  }, []);

  return (
    <Box>
      <Hero
        header={
          <Heading
            lineHeight={1.3}
            w='xl'
            fontWeight={500}
            mb='2'
            fontSize={{ base: '2xl', md: '36px' }}
          >
            The Long Short Story
          </Heading>
        }
        body={
          <Text color={'gray.600'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        }
        bgImage='/images/map-light.svg'
        bgColor='yellow.200'
        bgRepeat='no-repeat'
        bgPosition='530px 88px'
        bgSize='940px'
        style={{
          paddingBottom: '1rem',
        }}
        actions={
          <Box mt='2'>
            <Box
              alignItems='center'
              justifyContent='space-between'
              textAlign='left'
            >
              <Box mb='5' color='green.500'>
                <Heading fontSize='3xl' fontWeight='500'>
                  $20k
                </Heading>
                <Text mb='2'>raised of $30k goal</Text>
                <Progress
                  value={90}
                  backgroundColor='blackAlpha.100'
                  colorScheme='green'
                  borderRadius='4px'
                  size='sm'
                  w='full'
                />
              </Box>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Box mb='4' color='red.500'>
                  <Heading fontSize='3xl' fontWeight='500'>
                    $250
                  </Heading>
                  <Text>Minimum</Text>
                </Box>
                <Box mb='4'>
                  <Heading fontSize='3xl' fontWeight='500'>
                    900
                  </Heading>
                  <Text>Contributors</Text>
                </Box>
                <Box mb='4'>
                  <Heading fontSize='3xl' fontWeight='500'>
                    40
                  </Heading>
                  <Text>Days to go</Text>
                </Box>
              </Box>
            </Box>
            <Box display='flex' mt='10'>
              <Tooltip
                hasArrow
                placement='bottom'
                label='BUSD accepted'
                bg='black.500'
                color='white'
              >
                <Button
                  leftIcon={<BusdIcon />}
                  w='full'
                  variant='primaryAlt'
                  size='lg'
                >
                  <Trans>Back Campaign</Trans>
                </Button>
              </Tooltip>
              <AdvancedMenu
                items={[
                  {
                    text: 'Manage Campaign',
                    icon: <PencilSimpleLine size={20} />,
                  },
                  {
                    text: 'Create Request',
                    icon: <Receipt size={20} />,
                  },
                  {
                    text: 'Create Reward',
                    icon: <Gift size={20} />,
                    hasDivider: true,
                  },
                  {
                    text: 'Report Campaign',
                    icon: <Sword size={20} />,
                  },
                ]}
                menuButtonTrigger={
                  <DotsThree
                    size={30}
                    style={{ position: 'absolute' }}
                    color='black'
                  />
                }
                menuButtonStyle={{
                  size: 'lg',
                  'aria-label': 'More',
                  borderWidth: '1px',
                  borderColor: 'blackAlpha.300',
                  bg: 'transparent',
                  ml: '3',
                  _hover: {
                    backgroundColor: 'transparent',
                  },
                }}
                showOpenIcon={false}
              />
            </Box>
            <Box mt='7' mb='7' alignItems='center'>
              <Button
                leftIcon={<BookmarkSimple size={20} color='#72167B' />}
                borderWidth='1px'
                borderColor='blackAlpha.300'
                bg='transparent'
                color='black'
                size='sm'
                fontWeight='500'
                _hover={{
                  bg: 'none',
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        }
        showBackButton
        backButtonText='Back'
        media={
          <Gallery
            slides={[
              { src: '/images/long-story.jpg' },
              { src: '/images/demo.jpg' },
            ]}
          />
        }
      />

      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList padding='0 115px'>{renderTabs()}</TabList>

        <Container maxW='1240px' paddingTop='10'>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>four!</p>
            </TabPanel>
            <TabPanel>
              <Faq faqs={faqs} />
            </TabPanel>
          </TabPanels>
        </Container>
      </Tabs>
    </Box>
  );
};

export const getServerSideProps = async (context) => {
  // make request based on connected chain to thegraph
  // get campaign store in gun

  // merge data from thegraph and gun
  // return it to client
  let campaignProps = {};

  return {
    props: {
      campaignProps,
    }, // will be passed to the page component as props
  };
};

export default Campaign;
