import { darken, mode, whiten } from '@chakra-ui/theme-tools';

export const ButtonStyles = {
  baseStyle: {
    borderRadius: 'sm',
    borderColor: 'black.500',
  },
  sizes: {},
  variants: {
    primary: (props: any) => ({
      bg: 'black.500',
      color: 'white',
      _hover: {
        bg: whiten('black.500', 15),
        _disabled: {
          bg: whiten('black.500', 0),
        },
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
    primaryAlt: () => ({
      bg: 'purple.500',
      color: 'purple.100',
      _hover: {
        bg: whiten('purple.500', 15),
        _disabled: {
          bg: whiten('black.500', 0),
        },
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
    secondary: () => ({
      bg: 'yellow.500',
      color: 'black.500',
      _hover: {
        bg: whiten('yellow.500', 15),
        _disabled: {
          bg: whiten('yellow.500', 0),
        },
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
    plain: () => ({
      bg: 'gray.50',
      color: 'black.500',
      _hover: {
        bg: whiten('gray.50', 15),
        _disabled: {
          bg: whiten('gray.50', 0),
        },
      },
      _focus: {
        boxShadow: 'none',
      },
    }),
  },
  defaultProps: {
    variant: 'primary',
    size: 'md',
  },
};
