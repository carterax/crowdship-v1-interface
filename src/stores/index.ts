import { makeVar } from '@apollo/client';

type walletStoreType = {
  address: string;
  balance: string;
  walletName: string;
  provider: any;
};

type globalStoreType = {
  openModal: boolean;
};

export const initialState: {
  wallet: walletStoreType;
  global: globalStoreType;
} = {
  global: {
    openModal: false,
  },
  wallet: {
    address: '',
    balance: '',
    walletName: '',
    provider: {},
  },
};

export const walletStore = makeVar(initialState.wallet);
export const globalStore = makeVar(initialState.global);
