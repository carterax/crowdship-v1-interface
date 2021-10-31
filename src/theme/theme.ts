import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from '@/theme/components/buttonStyles';
import { InputStyles as Input } from '@/theme/components/inputStyles';

const overrides = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: 15,
      },
    },
  },
  fonts: {
    heading: 'DM Mono',
    body: 'DM Sans',
  },
  colors: {
    yellow: {
      100: '#FFFFF0',
      200: '#FFFAE1',
      400: '#FEFCBF',
      500: '#FFD60A',
    },
    purple: {
      100: '#FAF5FF',
      200: '#FDD7FB',
      500: '#72167B',
    },
    black: {
      400: '#333333',
      500: '#000000',
    },
    navy: {
      500: '#003566',
      600: '#001D3D',
      700: '#000814',
    },
    orange: {
      100: '#72167B',
      500: '#F6AD55',
    },
  },
  components: {
    Button,
    Input,
  },
});

export default extendTheme(overrides);
