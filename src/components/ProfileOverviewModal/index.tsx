import React, { FC, ReactElement, ReactNode } from 'react';
import { WalletState } from '@web3-onboard/core';
import { Box, Center, Text, Button } from '@chakra-ui/react';

import { CopySimple, ArrowSquareOut } from 'phosphor-react';

import { ModalDialog } from '@/components/ModalDialog';

import { generateSlicedAddress } from '@/utils/address';

import { IModalDialog } from '@/types/common/modal-dialog';

export interface IProfileOverviewModal extends IModalDialog {
  isOpen?: boolean;
  profileImage?: string | ReactNode;
  wallet?: WalletState;
  onOpen?: () => void;
  onClose?: () => void;
}

export const initialProps: IProfileOverviewModal = {
  profileImage: '',
  wallet: {} as WalletState,
  onOpen: () => {},
  onClose: () => {},
  isOpen: false,
};

const ProfileOverviewModal: FC<IProfileOverviewModal> = ({
  isOpen,
  profileImage,
  wallet,
  onOpen,
  onClose,
}): ReactElement => {
  return (
    <>
      <ModalDialog
        isCentered={true}
        backgroundColor='white'
        closeOnEsc
        closeOnOverlayClick
        blockScrollOnMount={true}
        size='md'
        onClose={onClose}
        overlayBgColor='blackAlpha.600'
        isOpen={isOpen}
        showCloseButton
      >
        <Center flexDirection='column' p='10'>
          <Center display='flex' flexDirection='column' justifyContent='center'>
            <Box>{profileImage}</Box>
            <Text color='blackAlpha.600' fontSize='sm' mt='5'>
              Connected with {wallet?.label} wallet
            </Text>
          </Center>
          <Box>
            <Text fontFamily='DM mono' fontWeight='500' fontSize='36px'>
              {generateSlicedAddress(wallet?.accounts?.[0]?.address)}
            </Text>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            mt='2'
          >
            <Button
              size='sm'
              variant='ghost'
              color='blackAlpha.600'
              fontWeight='500'
              m='1'
              leftIcon={<CopySimple width={20} height={20} />}
            >
              Copy Address
            </Button>
            <Button
              m='1'
              variant='ghost'
              color='blackAlpha.600'
              fontWeight='500'
              size='sm'
              leftIcon={<ArrowSquareOut width={20} height={20} />}
            >
              View Transactions
            </Button>
          </Box>
        </Center>
      </ModalDialog>
    </>
  );
};

ProfileOverviewModal.defaultProps = initialProps;

export default ProfileOverviewModal;
