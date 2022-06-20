import { i18n } from '@lingui/core';
import * as Plurals from 'make-plural/plurals';

const { locales }: { locales: string[] } = require('../../lingui.config.js');

locales.forEach((locale: string) => {
  i18n.loadLocaleData(locale, { plurals: Plurals[locale] });
});
