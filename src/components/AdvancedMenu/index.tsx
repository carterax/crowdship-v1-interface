import {
  FC,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { motion, useCycle } from 'framer-motion';

import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  PlacementWithLogical,
  Center,
} from '@chakra-ui/react';

import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons';

export interface IMenuItem {
  text?: string | ReactNode;
  icon?: ReactElement<any, string | JSXElementConstructor<any>>;
  onClick?: () => void;
  hasDivider?: boolean;
  children?: IMenuItem[];
  render?: () => ReactNode;
}

export interface IAdvancedMenu {
  items: IMenuItem[];
  menuButtonStyle: any;
  menuButtonTrigger: ReactNode;
  showOpenIcon?: boolean;
  closeOnSelect?: boolean;
  closeOnBlur?: boolean;
  placement?: PlacementWithLogical;
}

const slideHorizontalAnimation = {
  left: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  right: {
    x: -215,
    transition: {
      duration: 0.3,
    },
  },
};

const AdvancedMenu: FC<IAdvancedMenu> = ({
  items,
  menuButtonStyle,
  menuButtonTrigger,
  showOpenIcon,
  closeOnSelect,
  closeOnBlur,
  placement,
}): ReactElement => {
  const [currentSubMenu, setCurrentSubMenu] = useState([]);
  const [isLeftMenu, toggleMenu] = useCycle(true, false);

  const renderMenuIcon = (isOpen: boolean): ReactNode => {
    if (!isOpen) {
      return <TriangleDownIcon />;
    } else {
      return <TriangleUpIcon />;
    }
  };

  const renderText = (text: string | ReactNode, children: any[]): ReactNode => {
    return (
      <>
        <Box
          w='full'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          {typeof text !== 'string' ? (
            text
          ) : (
            <Text textTransform='capitalize'>{text}</Text>
          )}
          {children && children.length ? (
            <ChevronRightIcon w={4} h={4} />
          ) : null}
        </Box>
      </>
    );
  };

  const renderMenuItem = (
    { text, icon, onClick, hasDivider, children, render }: IMenuItem,
    idx: number | string
  ): ReactNode => {
    if (render) return <Box key={idx}>{render()}</Box>;

    return (
      <Box key={idx}>
        <MenuItem
          icon={icon}
          w='200px'
          m='2'
          borderRadius='md'
          onClick={() => {
            if (children && children.length) {
              toggleMenu();
              setCurrentSubMenu(children);
              return;
            }

            if (onClick) onClick();
          }}
        >
          <>{render ? render() : renderText(text, children)}</>
        </MenuItem>
        {hasDivider ? <MenuDivider /> : null}
      </Box>
    );
  };

  const mainMenu = items.map((menu, idx) => renderMenuItem(menu, idx));

  const subMenu = currentSubMenu.map((menu, idx) =>
    renderMenuItem(menu, `child-${idx}`)
  );

  // return merged main and sub menu with parent div
  const renderMenuItems = (): ReactNode => (
    <motion.div
      initial='left'
      animate={isLeftMenu ? 'left' : 'right'}
      variants={slideHorizontalAnimation}
      style={{
        width: '430px',
        display: 'flex',
      }}
    >
      <motion.div
        style={{
          width: '215px',
          position: 'relative',
          overflow: 'auto',
        }}
      >
        <MenuGroup>{mainMenu}</MenuGroup>
      </motion.div>
      <motion.div
        style={{
          width: '215px',
          position: 'relative',
          overflow: 'auto',
        }}
      >
        <Box position='absolute' top='0' right='0' height='100%'>
          <MenuGroup>
            {subMenu.length ? (
              <MenuItem
                w='200px'
                m='2'
                borderRadius='md'
                onClick={() => {
                  toggleMenu();
                }}
              >
                <ChevronLeftIcon w={4} h={4} />
              </MenuItem>
            ) : null}
            {subMenu}
          </MenuGroup>
        </Box>
      </motion.div>
    </motion.div>
  );

  return (
    <Menu
      placement={placement}
      isLazy
      closeOnSelect={closeOnSelect}
      onClose={() => {
        if (!isLeftMenu) {
          setCurrentSubMenu([]);
          toggleMenu();
        }
      }}
      closeOnBlur={closeOnBlur}
    >
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            {...menuButtonStyle}
            rightIcon={showOpenIcon ? renderMenuIcon(isOpen) : null}
          >
            <Center>{menuButtonTrigger}</Center>
          </MenuButton>
          <MenuList
            border='none'
            minW='unset'
            w='215px'
            pt='0'
            pb='0'
            shadow='xl'
            overflow='hidden'
          >
            {renderMenuItems()}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

AdvancedMenu.defaultProps = {
  closeOnBlur: true,
  closeOnSelect: true,
  showOpenIcon: true,
  menuButtonStyle: {
    variant: 'primary',
  },
  placement: 'bottom-end',
};

export default AdvancedMenu;
