import { ContextReader, ContextWriter } from '@/context/GlobalContext';

export const createProfileDrawer = (
  draft: ContextReader,
  action: ContextWriter
): void => {
  const { payload: { createProfileDrawer } = {} } = action;

  draft.createProfileDrawer.isOpen = createProfileDrawer.isOpen;
  draft.createProfileDrawer.type = createProfileDrawer.type;
  draft.createProfileDrawer.showButton = createProfileDrawer.showButton;
  draft.createProfileDrawer.title = createProfileDrawer.title;
  draft.createProfileDrawer.icon = createProfileDrawer.icon;
  draft.createProfileDrawer.buttonText = createProfileDrawer.buttonText;
  draft.createProfileDrawer.buttonAction = createProfileDrawer.buttonAction;
  draft.createProfileDrawer.buttonLoadingText =
    createProfileDrawer.buttonLoadingText;
};
