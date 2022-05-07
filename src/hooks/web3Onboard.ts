import {
  WalletState,
  ConnectedChain,
  EIP1193Provider,
} from '@web3-onboard/core';

import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';

import { useOnboardContext } from '@/context/OnboardContext';
import { gun } from '@/lib/gun';

export const useWallet = (): WalletState => {
  const { wallet } = useOnboardContext();

  if (wallet) {
    return wallet;
  }
};

export const useConnectedChain = (): ConnectedChain => {
  const { chains } = useWallet() || {};

  if (chains && chains.length) {
    return chains[0];
  }
};

export const useAuthenticate = (): [() => Promise<void>, boolean] => {
  const { authenticate, authenticating } = useOnboardContext();

  return [authenticate, authenticating];
};

export const useAuthenticated = (): boolean => {
  const address = useAddress();
  const user = gun.user().recall({ sessionStorage: true });

  return address && user.is;
};

export const useLogout = (): (() => void) => {
  const { logout } = useOnboardContext();
  return logout;
};

export const useAddress = (): string => {
  const { accounts } = useWallet() || {};

  if (accounts) {
    return accounts[0].address;
  }
};

export const useBalance = (): Record<string | number | symbol, string> => {
  const { accounts } = useWallet() || {};

  if (accounts.length) {
    return accounts[0].balance;
  }
};

export const useWalletProvider = (): EIP1193Provider => {
  const { provider } = useWallet() || {};
  return provider;
};

export const useSigner = (): JsonRpcSigner => {
  const provider = useWalletProvider();
  const chain = useConnectedChain();

  if (chain && provider) {
    const signer = new Web3Provider(provider).getSigner();
    return signer;
  }
};

export const useContract = () => {
  const walletProvider = useWalletProvider();
  const signer = useSigner();

  if (signer && walletProvider) {
    const contract = (address: string, abi: ContractInterface): Contract => {
      const provider = new Web3Provider(walletProvider);
      return new Contract(address, abi, provider).connect(signer);
    };

    return contract;
  }
};
