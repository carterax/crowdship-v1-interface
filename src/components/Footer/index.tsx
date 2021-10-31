import Image from 'next/image';
import {
  Container,
  SimpleGrid,
  Box,
  Link,
  Heading,
  Text,
  Spacer,
} from '@chakra-ui/react';

const footerLinks = [
  {
    heading: 'Project',
    children: [
      {
        title: 'About',
        link: '#',
      },
      {
        title: 'Team',
        link: '#',
      },
      {
        title: 'FAQ',
        link: '#',
      },
    ],
  },
  {
    heading: 'Discover',
    children: [
      {
        title: 'On fire!',
        link: '#',
      },
      {
        title: 'Top raisers',
        link: '#',
      },
      {
        title: 'Latest campaigns',
        link: '#',
      },
    ],
  },
  {
    heading: 'Contribution',
    children: [
      {
        title: 'Documentation',
        link: '#',
      },
      {
        title: 'Contributors',
        link: '#',
      },
      {
        title: 'Github',
        link: '#',
      },
    ],
  },
  {
    heading: 'Resources',
    children: [
      {
        title: 'Github',
        link: '#',
      },
      {
        title: 'Forum',
        link: '#',
      },
    ],
  },
];

const socialLinks = [
  {
    name: 'Discord',
    link: '#',
    iconPath: '/discord-icon.svg',
  },
  {
    name: 'Github',
    link: '#',
    iconPath: '/github-icon.svg',
  },
  {
    name: 'Reddit',
    link: '#',
    iconPath: '/reddit-icon.svg',
  },
];

export const Footer = () => {
  return (
    <Container maxW='1240px' mt={100} pb={20}>
      <SimpleGrid columns={[2, null, 4]} spacing='40px'>
        {footerLinks.map(({ heading, children }, idx) => (
          <Box key={idx}>
            <Heading fontSize='2xl'>{heading}</Heading>
            <Box>
              {children.map(({ title, link }, childIdx) => (
                <Text mt={4} key={childIdx}>
                  <Link href={link}>{title}</Link>
                </Text>
              ))}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt={40}>
        <Box display='flex' alignItems='center'>
          <Image
            src='/logo-light.svg'
            width='181'
            height='48'
            alt='Crowdship Logo'
          />
          <Spacer />
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
          >
            {socialLinks.map(({ name, link, iconPath }, idx) => (
              <Text key={idx} px={2}>
                <Link href={link} _focus={{ boxShadow: 'none' }}>
                  <Image src={iconPath} width='25' height='25' alt={name} />
                </Link>
              </Text>
            ))}
          </Box>
        </Box>
        <Box display='flex' alignItems='center' mt={5}>
          <Text color='gray.500'>
            Copyright @2021{' '}
            <Link
              href='#'
              color='black.500'
              fontWeight='700'
              textDecoration='underline'
            >
              crowdship.capital
            </Link>
          </Text>
          <Spacer />
          <Text as='a' href='#' color='black.500' fontWeight='700'>
            Terms & Conditions
          </Text>
        </Box>
      </Box>
    </Container>
  );
};
