import { darken, mode, whiten } from '@chakra-ui/theme-tools';

export const InputStyles = {
  baseStyle: {
    field: {
      borderRadius: 'sm',
      border: 'none',
      _hover: {
        borderColor: 'primary.foreground',
      },
    },
  },
  sizes: {},
  variants: {
    outlineAlt: {
      field: {
        border: 'none',
        bg: 'rgba(0, 0, 0, 0.06)',
        color: 'black.500',
        _focus: {
          borderColor: '#9280FF',
          boxShadow: 'none',
        },
      },
    },
  },
  defaultProps: {},
};
