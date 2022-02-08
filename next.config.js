/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    campaignFactoryAddress: '',
    campaignImplementationAddress: '0x1D6e7a4d9faf971A3A47Dc74cdcC1C0C769700dE',
    campaignRequestImplementationAddress:
      '0xfFe06357756e156474378D3F2f32c72a7065CD1f',
    campaignRewardImplementationAddress:
      '0xD5A893dE91856DE51bF68A6104AaFa80f4E8C75e',
    campaignVoteImplementationAddress:
      '0x10c7897De25f2a2bEdc6590F6d5788B536c805F6',
  },
  images: {
    domains: ['ipfs.io'],
    formats: ['image/jpeg', 'image/png', 'image/gif'],
  },
  reactStrictMode: true,
  webpack(config, options) {
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
