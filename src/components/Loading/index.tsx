import { FC } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';

import { ModalDialog } from '@/components/ModalDialog';

export const Loading: FC<{
  loading: boolean;
  loadingText: string;
  loadingAnimation: object;
}> = ({ loading, loadingText, loadingAnimation }) => {
  return (
    <ModalDialog
      isCentered
      backgroundColor='transparent'
      boxShadow='none'
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size='full'
      onClose={null}
      overlayBgColor='blackAlpha.800'
      isOpen={loading}
    >
      <Box
        minH='90vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Box w='xs' mb={-5}>
          <Lottie animationData={loadingAnimation} />
        </Box>
        <Box>
          <Heading color='white'>{loadingText}</Heading>
        </Box>
      </Box>
    </ModalDialog>
  );
};
