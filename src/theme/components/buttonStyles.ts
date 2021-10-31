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
