import Onboard from 'bnc-onboard';
import Web3 from 'web3';
import Factory from '@/abis/Factory.json';
import { V1_CORE_FACTORY_ADDRESS } from '@/constants/addresses';
import { SupportedChainId } from '@/constants/chains';

const DAPP_ID = 'f103de9f-3220-41f0-97c1-9ed286b86fc2';
const PORTIS_ID = 'b0c1514e-eb13-4102-be08-85b6f02a5f34';
const FORTMATIC_KEY = 'pk_test_D1E1D4C8EC7B99EB';

export let CORE_FACTORY: any;

export const onboard = Onboard({
  dappId: DAPP_ID, // [String] The API key created by step one above
  networkId: 1337, // [Integer] The Ethereum network ID your Dapp uses.
  networkName: 'Ganache',
  subscriptions: {
    wallet: async (wallet: any) => {
      let web3 = new Web3(wallet.provider);
      CORE_FACTORY = new web3.eth.Contract(
        Factory as any,
        V1_CORE_FACTORY_ADDRESS
      );
      // let t = await CORE_FACTORY.methods.root().call();
      // console.log(t);
      // if (wallet.provider) {
      //   CORE_FACTORY = new ethers.Contract(
      //     V1_CORE_FACTORY_ADDRESS,
      //     Factory.abi,
      //     wallet.provider
      //   );
      // }
    },
  },
});
