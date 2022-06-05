import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';

import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import { WalletState } from '@web3-onboard/core';

import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { getAddress } from '@ethersproject/address';

import { useGlobalState } from '@/hooks/globalState';

import { ReducerTypes } from '@/reducer';

import { user } from '@/lib/gun';
import { SupportedChainId } from '@/constants/chains';

export interface IOnboardContext {
  wallet: WalletState;
  authenticate: () => Promise<void>;
  authenticating: boolean;
  authenticated: boolean;
  connectedChainError: Error | null;
  logout: () => void;
}

const initialCtxProps = {
  wallet: {} as WalletState,
  authenticate: () => Promise.resolve(),
  authenticating: false,
  authenticated: false,
  connectedChainError: null,
  logout: () => {},
};

const OnboardContext = createContext<IOnboardContext>(initialCtxProps);

export function useOnboardContext() {
  return useContext(OnboardContext);
}

export const OnboardProvider = ({ children }) => {
  const [state, setState] = useState<{
    authenticating: boolean;
    authenticated: boolean;
    connectedChainError: Error | null;
  }>({
    authenticating: false,
    authenticated: false,
    connectedChainError: null,
  });
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }] = useSetChain();
  const { dispatch } = useGlobalState();

  const authenticate = async (): Promise<void> => {
    if (state.connectedChainError) {
      // open wrong network modal
      dispatch({
        type: ReducerTypes.TOGGLE_NOTIFICATION,
        payload: {
          notification: {
            isOpen: true,
            type: 'error',
            title: state.connectedChainError.message,
          },
        },
      });
    } else {
      await connect({});
    }
  };

  const _signGunLogin = async (signer: JsonRpcSigner): Promise<string> => {
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

  const _authenticateWithGun = async (wallet: WalletState) => {
    setState({
      ...state,
      authenticating: true,
    });

    try {
      const address = getAddress(wallet.accounts[0].address);
      const provider = new Web3Provider(wallet.provider);
      const signature = await _signGunLogin(provider.getSigner());

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
        sea: unknown;
        soul: string;
      }>((resolve) => {
        user.create(address, signature, () => {
          user.auth(address, signature, (ack) => resolve(ack as any));
        });
      });

      const error = ack as unknown as { err?: string };

      if (error.err) throw new Error(error.err);

      // console.log(login);
      // console.log(ack.sea);
      if (user && user.is) {
        window.localStorage.setItem(
          'connectedWallets',
          JSON.stringify([wallet.label])
        );
        setState({
          ...state,
          authenticating: false,
          authenticated: true,
        });
      }
    } catch (error) {
      _disconnectWallet();
      dispatch({
        type: ReducerTypes.TOGGLE_NOTIFICATION,
        payload: {
          notification: {
            isOpen: true,
            title: error.message,
            type: 'error',
          },
        },
      });
      setState({
        ...state,
        authenticating: false,
      });
    }
  };

  const _disconnectWallet = async (): Promise<void> =>
    wallet && disconnect(wallet);

  const _destroyGunSession = (): void => user.leave();

  const logout = async (): Promise<void> => {
    setState({
      ...state,
      authenticated: false,
    });
    await _disconnectWallet();
    _destroyGunSession();
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

  useEffect(() => {
    if (
      connectedChain &&
      connectedChain.id &&
      !Object.values(SupportedChainId).includes(
        connectedChain.id as SupportedChainId
      )
    ) {
      setState({
        ...state,
        connectedChainError: new Error('Wrong Network'),
      });
    }
  }, [connectedChain]);

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
