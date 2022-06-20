import { ContextReader, ContextWriter } from '@/context/GlobalContext';

import { toggleNotification } from './toggleNotification';

export enum ReducerTypes {
  TOGGLE_SEARCH_MODAL = 'TOGGLE_SEARCH_MODAL',
  TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION',
  TOGGLE_NOTIFICATION_LOADING = 'TOGGLE_NOTIFICATION_LOADING',
  SET_LOADING = 'SET_LOADING',
  TOGGLE_PROFILE_OVERVIEW_MODAL = 'TOGGLE_PROFILE_OVERVIEW_MODAL',
}

const reducer = (draft: ContextReader, action: ContextWriter): void => {
  switch (action.type) {
    case ReducerTypes.TOGGLE_SEARCH_MODAL:
      draft.searchModalDialog.isOpen = action.payload.searchModalDialog.isOpen;
      break;
    case ReducerTypes.TOGGLE_NOTIFICATION:
      toggleNotification(draft, action);
      break;
    case ReducerTypes.TOGGLE_NOTIFICATION_LOADING:
      draft.notification.loading = action.payload.notification.loading;
      break;
    case ReducerTypes.SET_LOADING:
      draft.loading.isLoading = action.payload.loading.isLoading;
      break;
    case ReducerTypes.TOGGLE_PROFILE_OVERVIEW_MODAL:
      draft.profileOverviewModal.isOpen =
        action.payload.profileOverviewModal.isOpen;
    default:
      break;
  }
};

export default reducer;
