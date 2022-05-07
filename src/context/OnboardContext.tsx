import React, { useEffect, useState, createContext, useContext } from 'react';

import { useConnectWallet } from '@web3-onboard/react';
import { WalletState } from '@web3-onboard/core';

import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';

import { gun } from '@/lib/gun';
import { ISEAPair } from 'gun/types/sea/ISEAPair';

import 'gun/sea';

export interface IOnboardContext {
  wallet: WalletState;
  authenticate: () => Promise<void>;
  authenticating: boolean;
  logout: () => void;
}

const initialCtxProps = {
  wallet: {} as WalletState,
  authenticate: () => Promise.resolve(),
  authenticating: false,
  logout: () => {},
};

const OnboardContext = createContext<IOnboardContext>(initialCtxProps);

export function useOnboardContext() {
  return useContext(OnboardContext);
}

export const OnboardProvider = ({ children }) => {
  const [state, setState] = useState<{ authenticating: boolean }>({
    authenticating: false,
  });
  const [{ wallet }, connect, disconnect] = useConnectWallet();

  const _signLogin = async (signer: JsonRpcSigner): Promise<string> => {
    const cached = localStorage.getItem('signin');

    if (cached === null) {
      const address = await signer.getAddress();
      const signature = await signer.signMessage(
        `Login signature for account ${address}`
      );

      localStorage.setItem('signin', signature);

      return signature;
    } else {
      return cached!;
    }
  };

  const authenticate = async (): Promise<void> => await connect({});

  const _authenticateWithGun = async (wallet: WalletState) => {
    setState({
      ...state,
      authenticating: true,
    });

    try {
      const address = wallet.accounts[0].address;
      const provider = new Web3Provider(wallet.provider);
      const login = await _signLogin(provider.getSigner());
      const user = gun.user();

      const ack = await new Promise<{
        ack: 2;
        get: string;
        on: (...args: [unknown, unknown, unknown]) => unknown;
        put: {
          alias: string;
          auth: any;
          epub: string;
          pub: string;
        };
        sea: ISEAPair;
        soul: string;
      }>((resolve) => {
        user.create(address, login, () => {
          user.auth(address, login, (ack) => resolve(ack as any));
        });
      });

      const error = ack as unknown as { error?: string };
      console.log(error);
      if (error.error) throw new Error(error.error);

      // console.log(login);
      // console.log(ack.sea);
      const isLoggedIn: any = gun.user().recall({ sessionStorage: true });

      if (isLoggedIn && isLoggedIn.is) {
        window.localStorage.setItem(
          'connectedWallets',
          JSON.stringify([wallet.label])
        );
        setState({
          ...state,
          authenticating: false,
        });
      }
    } catch (error) {
      setState({
        ...state,
        authenticating: false,
      });
      console.log(error);
    }
  };

  const disconnectWallet = async (): Promise<void> =>
    wallet && disconnect(wallet);

  const destroy = (): void => {
    const user = gun.user().recall({ sessionStorage: true });
    user.leave();
  };

  const logout = async (): Promise<void> => {
    await disconnectWallet();
    destroy();
  };

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    );

    if (previouslyConnectedWallets) {
      connect({
        autoSelect: {
          label: previouslyConnectedWallets[0],
          disableModals: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (wallet) _authenticateWithGun(wallet);

    if (!wallet) window.localStorage.removeItem('connectedWallets');
  }, [wallet]);

  return (
    <OnboardContext.Provider
      value={{
        ...state,
        wallet,
        authenticate,
        logout,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};

export default OnboardProvider;
