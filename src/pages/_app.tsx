import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { walletStore } from '@/stores';
import { web3, onboard } from '@/connectors';
import theme from '@/theme/theme';

import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-mono/500.css';

const client = new ApolloClient({
  uri: 'http://localhost:8000/subgraphs/name/pelicandistress/crowdship',
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const walletSelection = async () => {
      const previouslySelectedWallet =
        window.localStorage.getItem('selectedWallet');

      if (previouslySelectedWallet != 'undefined') {
        await onboard.walletSelect(previouslySelectedWallet || '');
        await onboard.walletCheck();

        const { address, wallet } = onboard.getState();
        const balance = await web3.eth.getBalance(address);

        if (address) {
          walletStore({
            walletReady: true,
            address,
            balance: web3.utils.fromWei(balance, 'ether'),
            walletName: wallet.name || '',
          });
        }
      }
    };
    walletSelection();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
