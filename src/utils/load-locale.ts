import { i18n } from '@lingui/core';

const loadLocale = async (locale: string) => {
  const { messages } = await import(`../locale/${locale}/messages.po`);

  i18n.load(locale, messages);
  i18n.activate(locale);
};

export default loadLocale;
