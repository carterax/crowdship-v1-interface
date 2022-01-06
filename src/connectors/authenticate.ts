import { onboard, web3 } from '@/connectors/onboard';
import { gun } from '@/lib/gun';
import { IGunCryptoKeyPair } from 'gun/types/types';
import 'gun/sea';

const signLogin = async (account: string) => {
  const cached = localStorage.getItem('signin');

  if (cached === null) {
    const signature = await web3.eth.personal.sign(
      web3.utils.fromUtf8(`Login signiture for account ${account}`),
      account
    );

    localStorage.setItem('signin', signature);

    return signature;
  } else {
    return cached!;
  }
};

export const authenticate = async () => {
  try {
    const previouslySelectedWallet =
      window.localStorage.getItem('selectedWallet');

    if (
      previouslySelectedWallet != 'undefined' &&
      previouslySelectedWallet !== null
    ) {
      await onboard.walletSelect(previouslySelectedWallet || '');
    } else {
      await onboard.walletSelect();
    }

    await onboard.walletCheck();

    const { address } = onboard.getState();

    const login = await signLogin(address);

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
      sea: IGunCryptoKeyPair;
      soul: string;
    }>((resolve) => {
      user.create(address, login, () => {
        user.auth(address, login, (ack) => resolve(ack as any));
      });
    });

    const error = ack as unknown as { error?: string };

    if (error.error) return;

    // console.log(login);
    // console.log(ack.sea);
    // console.log(gun.user().recall({ sessionStorage: true }));
  } catch (error) {
    console.log(error);
  }
};
