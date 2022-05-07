import { ContextReader, ContextWriter } from '@/context/GlobalContext';

import { createProfileDrawer } from './createProfileDrawer';

export enum ReducerTypes {
  TOGGLE_SEARCH_MODAL = 'TOGGLE_SEARCH_MODAL',
  TOGGLE_CREATE_PROFILE_DRAWER = 'OPEN_CREATE_PROFILE_DRAWER',
  PROFILE_DRAWER_LOADING = 'PROFILE_DRAWER_LOADING',
  SET_LOADING = 'SET_LOADING',
}

const reducer = (draft: ContextReader, action: ContextWriter): void => {
  switch (action.type) {
    case ReducerTypes.TOGGLE_SEARCH_MODAL:
      draft.searchModalDialog.isOpen = action.payload.searchModalDialog.isOpen;
      break;
    case ReducerTypes.TOGGLE_CREATE_PROFILE_DRAWER:
      createProfileDrawer(draft, action);
      break;
    case ReducerTypes.PROFILE_DRAWER_LOADING:
      draft.createProfileDrawer.loading =
        action.payload.createProfileDrawer.loading;
      break;
    case ReducerTypes.SET_LOADING:
      draft.loading.isLoading = action.payload.loading.isLoading;
      break;
    default:
      break;
  }
};

export default reducer;
