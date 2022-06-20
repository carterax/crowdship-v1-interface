const { locales, sourceLocale } = require('./lingui.config.js');

/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales,
    defaultLocale: sourceLocale,
  },
  env: {
    defaultChain: 'rinkeby',
    ethereum: {
      rpcUrl: 'https://mainnet.infura.io/v3/acf6da770e604c3192b10bfdc30b296a',
      factoryImplementation: '',
      campaignFactoryImplementation: '',
      campaignImplementation: '',
      campaignRequestImplementation: '',
      campaignRewardImplementation: '',
      campaignVoteImplementation: '',
      myCrowdship: '', // generated via Factory
    },
    polygon: {
      rpcUrl:
        'https://polygon-mainnet.infura.io/v3/acf6da770e604c3192b10bfdc30b296a',
      factoryImplementation: '',
      campaignFactoryImplementation: '',
      campaignImplementation: '',
      campaignRequestImplementation: '',
      campaignRewardImplementation: '',
      campaignVoteImplementation: '',
      myCrowdship: '', // generated via Factory
    },
    bsc: {
      rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
      factoryImplementation: '',
      campaignFactoryImplementation: '',
      campaignImplementation: '',
      campaignRequestImplementation: '',
      campaignRewardImplementation: '',
      campaignVoteImplementation: '',
      myCrowdship: '', // generated via Factory
    },
    rinkeby: {
      rpcUrl: 'https://rinkeby.infura.io/v3/acf6da770e604c3192b10bfdc30b296a',
      factoryImplementation: '0x31be600172587AB86105A5524F5D9B81274C7f23',
      campaignFactoryImplementation:
        '0x416AaB05175a1e363bC5FB3cB6D11EAECcD2980F',
      campaignImplementation: '0x363233576d7736132A2a3E2036a47955E43dD50b',
      campaignRequestImplementation:
        '0x998e166A3fAbc419352C63E68A95EEE1a6052793',
      campaignRewardImplementation:
        '0x356A41ac9f14D680408782E43a81E9e8c34809E5',
      campaignVoteImplementation: '0x73C18a454688B17EDB302A8d6509Cab23F28a785',
      myCrowdship: '', // generated via Factory
    },
  },
  images: {
    domains: ['ipfs.io'],
  },
  reactStrictMode: false,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.po/,
      use: ['@lingui/loader'],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    });

    return config;
  },
};
