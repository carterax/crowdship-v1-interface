import React from 'react';
import { GlobalStore } from '@/stores/global';

export const storesContext = React.createContext({
  globalStore: new GlobalStore(),
});
