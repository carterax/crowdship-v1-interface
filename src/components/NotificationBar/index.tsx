import { FC, ReactNode } from 'react';
import {
  Center,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  Box,
} from '@chakra-ui/react';
import { Info } from 'phosphor-react';

import { IModalDrawer } from '@/types/common/modal-drawer';

export interface INotificationBar extends IModalDrawer {
  title?: string;
  icon?: ReactNode;
  buttonText?: string;
  buttonAction?: () => Promise<unknown>;
  buttonLoadingText?: string;
  showButton?: boolean;
  loading?: boolean;
  type?: 'success' | 'info' | 'error';
}

export const initialProps: INotificationBar = {
  title: 'Notification',
  icon: <Info size={25} />,
  buttonText: 'Dismiss',
  buttonAction: () => Promise.resolve(),
  buttonLoadingText: 'Creating...',
  showButton: false,
  loading: false,
  isOpen: false,
  position: 'top',
  type: 'info',
};

export const NotificationBar: FC<INotificationBar> = ({
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
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor={renderBgColor()}>
        <DrawerCloseButton top='16px' color='#FFFFFF' />
        <DrawerBody>
          <Center
            alignItems='center'
            maxWidth='container.lg'
            margin='0 auto'
            minHeight='45'
          >
            <Box display='flex'>
              {icon && (
                <Box marginRight={1} color={renderTextColor()}>
                  {icon}
                </Box>
              )}
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

NotificationBar.defaultProps = initialProps;
