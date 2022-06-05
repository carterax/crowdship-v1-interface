import { ContextReader, ContextWriter } from '@/context/GlobalContext';

export const toggleNotification = (
  draft: ContextReader,
  action: ContextWriter
): void => {
  const { payload: { notification } = {} } = action;

  draft.notification.isOpen = notification.isOpen;
  draft.notification.type = notification.type;
  draft.notification.showButton = notification.showButton;
  draft.notification.title = notification.title;
  draft.notification.icon = notification.icon;
  draft.notification.buttonText = notification.buttonText;
  draft.notification.buttonAction = notification.buttonAction;
  draft.notification.buttonLoadingText = notification.buttonLoadingText;
};
