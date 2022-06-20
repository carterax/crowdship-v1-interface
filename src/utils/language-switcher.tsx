import { useRouter } from 'next/router';
import { getLangNameFromCode } from 'language-name-map';
import { Box } from '@chakra-ui/react';
import { setCookies } from 'cookies-next';

import { Check } from 'phosphor-react';

import { IMenuItem } from '@/components/AdvancedMenu';

const languageSwitcher = () => {
  const { locale, locales, pathname, push, query, asPath } = useRouter();

  const setLocale = (_locale: string) => {
    setCookies('NEXT_LOCALE', _locale);
    push(
      {
        pathname,
        query,
      },
      asPath,
      { locale: _locale }
    );
  };

  return locales.map(
    (_locale): IMenuItem => ({
      text: (
        <Box
          w='100%'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box w='100%'>{getLangNameFromCode(_locale).native}</Box>
          {locale === _locale ? <Check size={20} /> : null}
        </Box>
      ),
      onClick: () => setLocale(_locale),
    })
  );
};

export default languageSwitcher;
