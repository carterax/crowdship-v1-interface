import { makeVar } from '@apollo/client';

type walletStoreType = {
  address: string;
  balance: string;
  walletName: string;
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
  },
};

export const walletStore = makeVar(initialState.wallet);
export const globalStore = makeVar(initialState.global);
