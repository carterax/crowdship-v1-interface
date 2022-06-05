import {
  useGlobalContext,
  ContextReader,
  ContextWriter,
} from '@/context/GlobalContext';
import { Dispatch } from 'react';

export const useGlobalState = (): {
  state: ContextReader;
  dispatch: Dispatch<ContextWriter>;
} => {
  const { state, dispatch } = useGlobalContext();

  return { state, dispatch };
};
