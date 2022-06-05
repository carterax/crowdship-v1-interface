import type { NextPageContext } from 'next';
import router from 'next/router';

export type NextRedirectOptions = {
  to: string;
  ctx: NextPageContext;
};

export const nextRedirect = async (
  options: NextRedirectOptions
): Promise<any> => {
  if (typeof window === 'undefined') {
    options.ctx.res.writeHead(307, { Location: options.to });
    options.ctx.res.end();
  } else {
    router.replace(options.to);
  }

  return new Promise(() => {});
};
