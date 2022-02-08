import { extendTheme } from '@chakra-ui/react';

import { ButtonStyles as Button } from '@/theme/components/buttonStyles';
import { InputStyles as Input } from '@/theme/components/inputStyles';
import { NumberInputStyles as NumberInput } from '@/theme/components/numberInputStyles';
import { alertStyles as Alert } from '@/theme/components/alertStyles';
import { progressStyles as Progress } from './components/progressStyle';

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
    red: {
      500: '#E53E3E',
    },
    green: {
      300: '#68D391',
      400: '#48BB78',
    },
  },
  components: {
    Button,
    Input,
    NumberInput,
    Alert,
    Progress,
  },
});

export default extendTheme(overrides);
