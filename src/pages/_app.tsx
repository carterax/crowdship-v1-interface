import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { observer } from 'mobx-react'

import getLibrary from '@/utils/getLibrary'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
