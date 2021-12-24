import { makeVar } from '@apollo/client';

type walletStoreType = {
  address: string;
  balance: string;
  walletName: string;
};

type globalStoreType = {
  openSearchDialog: boolean;
};

export const initialState: {
  wallet: walletStoreType;
  global: globalStoreType;
} = {
  global: {
    openSearchDialog: false,
  },
  wallet: {
    address: '',
    balance: '',
    walletName: '',
  },
};

export const walletStore = makeVar(initialState.wallet);
export const globalStore = makeVar(initialState.global);
