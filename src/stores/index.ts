import { makeVar } from '@apollo/client';

type walletStoreType = {
  walletReady: boolean;
  address: string;
  balance: string;
  walletName: string;
};

export const initialState: { wallet: walletStoreType } = {
  wallet: {
    walletReady: false,
    address: '',
    balance: '',
    walletName: '',
  },
};

export const walletStore = makeVar(initialState.wallet);
