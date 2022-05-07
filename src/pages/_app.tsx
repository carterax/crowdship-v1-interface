import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';

import { OnboardProvider } from '@/context/OnboardContext';
import theme from '@/theme/theme';

import '@/styles/global.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-mono/500.css';

import '@/connectors/onboard';
import GlobalProvider from '@/context/GlobalContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <OnboardProvider>
        <GlobalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalProvider>
      </OnboardProvider>
    </ChakraProvider>
  );
};

export default App;
