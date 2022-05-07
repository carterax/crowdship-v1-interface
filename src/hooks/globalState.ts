import { ContextReader, ContextWriter } from './../context/GlobalContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { Dispatch } from 'react';

const useGlobalState = (): {
  state: ContextReader;
  dispatch: Dispatch<ContextWriter>;
} => {
  const { state, dispatch } = useGlobalContext();

  return { state, dispatch };
};

export default useGlobalState;
