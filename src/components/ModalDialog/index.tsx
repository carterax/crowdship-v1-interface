import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { IModalDialog } from '@/types/common/modal-dialog';

export const ModalDialog: FC<IModalDialog> = ({
  children,
  size,
  showCloseButton,
  closeOnEsc,
  isOpen,
  closeOnOverlayClick,
  isCentered,
  onClose,
  overlayBgColor,
  blockScrollOnMount,
  ...rest
}) => {
  return (
    <Modal
      isCentered={isCentered}
      blockScrollOnMount={blockScrollOnMount}
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnEsc={closeOnEsc}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalOverlay backgroundColor={overlayBgColor} />
      <ModalContent {...rest}>
        {showCloseButton ? <ModalCloseButton /> : ''}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
