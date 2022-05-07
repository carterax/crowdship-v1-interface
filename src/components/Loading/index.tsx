import { FC, useMemo } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import Lottie from 'lottie-react';

import { ModalDialog } from '@/components/ModalDialog';
import LoadingAnimation from '@/components/lottie/loading.json';

export interface ILoading {
  isLoading?: boolean;
  loadingText?: string;
  loadingAnimation?: any;
}

export const initialProps: ILoading = {
  isLoading: false,
  loadingText: 'Loading...',
  loadingAnimation: LoadingAnimation,
};

export const Loading: FC<ILoading> = ({
  isLoading,
  loadingText,
  loadingAnimation,
}) => {
  const animation = useMemo(() => LoadingAnimation, []);

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
      isOpen={isLoading}
    >
      <Box
        minH='90vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Box w='xs' mb={-5}>
          {/* {loadingAnimation && (
            <Lottie animationData={animation} loop={true} autoPlay={true} />
          )} */}
        </Box>
        <Box>
          <Heading color='white'>{loadingText}</Heading>
        </Box>
      </Box>
    </ModalDialog>
  );
};

Loading.defaultProps = initialProps;
