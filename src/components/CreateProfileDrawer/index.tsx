import { FC, ReactNode } from 'react';
import {
  Center,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Box,
} from '@chakra-ui/react';
import { Info } from 'phosphor-react';

import { IModalDrawer } from '@/types/common/modal-drawer';

export interface ICreateProfileDrawer extends IModalDrawer {
  title?: string;
  icon?: ReactNode;
  buttonText?: string;
  buttonAction?: () => Promise<unknown>;
  buttonLoadingText?: string;
  showButton?: boolean;
  loading?: boolean;
  type?: 'success' | 'info' | 'error';
}

export const initialProps: ICreateProfileDrawer = {
  title: 'Seems you are without a profile, create one right here.',
  icon: <Info size={25} />,
  buttonText: 'Create',
  buttonAction: () => Promise.resolve(),
  buttonLoadingText: 'Creating...',
  showButton: true,
  loading: false,
  isOpen: false,
  position: 'top',
  type: 'info',
};

export const CreateProfileDrawer: FC<ICreateProfileDrawer> = ({
  title,
  icon,
  buttonText,
  buttonAction,
  buttonLoadingText,
  loading,
  isOpen,
  onClose,
  position,
  type,
  showButton,
}) => {
  const renderBgColor = () => {
    switch (type) {
      case 'success':
        return 'green.500';
      case 'info':
        return 'yellow.500';
      case 'error':
        return 'red.500';
      default:
        return 'yellow.500';
    }
  };

  const renderTextColor = () => {
    switch (type) {
      case 'success':
        return 'white';
      case 'info':
        return 'black';
      case 'error':
        return 'white';
      default:
        return 'white';
    }
  };

  return (
    <Drawer
      placement={position}
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick
      closeOnEsc
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor={renderBgColor()}>
        <DrawerBody>
          <Center
            alignItems='center'
            maxWidth='container.lg'
            margin='0 auto'
            height='55'
          >
            <Box display='flex' alignItems='center'>
              {icon && <Box marginRight={1}>{icon}</Box>}
              <Text
                as='h3'
                marginRight={5}
                fontSize='17px'
                fontWeight='500'
                color={renderTextColor()}
              >
                {title}
              </Text>
            </Box>
            <Box>
              {showButton ? (
                <Button
                  isLoading={loading}
                  loadingText={buttonLoadingText}
                  onClick={buttonAction}
                >
                  {buttonText}
                </Button>
              ) : null}
            </Box>
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

CreateProfileDrawer.defaultProps = initialProps;
