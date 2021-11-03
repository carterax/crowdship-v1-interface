import { ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

// export const closeModal = () =>
//   globalStore({ ...globalStore(), openModal: false });

// export const openModal = () =>
//   globalStore({ ...globalStore(), openModal: true });

export const ModalDialog = ({
  children,
  size,
  showCloseButton,
  closeOnEsc,
  isOpen,
  closeOnOverlayClick,
  isCentered,
  onClose,
  overlayBgColor,
  ...rest
}: any) => {
  return (
    <>
      <Modal
        isCentered
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
    </>
  );
};
