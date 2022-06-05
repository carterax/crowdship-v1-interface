import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

import reducer, { ReducerTypes } from '@/reducer';

import {
  SearchModalDialog,
  ISearchModalDialog,
  initialProps as searchModalDialogProps,
} from '@/components/SearchModalDialog';

import {
  NotificationBar,
  INotificationBar,
  initialProps as notificationBarProps,
} from '@/components/NotificationBar';

import {
  Loading,
  ILoading,
  initialProps as loadingProps,
} from '@/components/Loading';

export interface ContextReader {
  searchModalDialog?: ISearchModalDialog;
  notification?: INotificationBar;
  loading?: ILoading;
}

export interface ContextWriter {
  type: string;
  payload: ContextReader;
}

export interface IGlobalContext {
  state: ContextReader;
  dispatch: React.Dispatch<ContextWriter>;
}

const initialCtxProps: IGlobalContext = {
  state: {
    searchModalDialog: searchModalDialogProps,
    notification: notificationBarProps,
    loading: loadingProps,
  },
  dispatch: () => {},
};

const GlobalContext = createContext<IGlobalContext>(initialCtxProps);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer<ContextReader, ContextWriter>(
    reducer,
    initialCtxProps.state
  );

  const toggleSearchModal = (isOpen: boolean) => {
    dispatch({
      type: ReducerTypes.TOGGLE_SEARCH_MODAL,
      payload: {
        searchModalDialog: {
          isOpen,
        },
      },
    });
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <Loading {...state.loading} />
      <NotificationBar
        {...state.notification}
        onClose={() =>
          dispatch({
            type: ReducerTypes.TOGGLE_NOTIFICATION,
            payload: {
              notification: {
                isOpen: false,
              },
            },
          })
        }
      />
      <SearchModalDialog
        {...state.searchModalDialog}
        onOpen={() => toggleSearchModal(true)}
        onClose={() => toggleSearchModal(false)}
      />
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
