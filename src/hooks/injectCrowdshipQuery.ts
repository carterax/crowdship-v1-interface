import { useRouter } from 'next/router';

export const addQueryParamsToUrl = (url: string, params: unknown): string => {
  const tmpBase = !url.startsWith('http') ? 'http://tmp-base.com' : undefined;
  const modifiedUrl = new URL(url || '', tmpBase);

  Object.keys(params).forEach((key) => {
    if (modifiedUrl.searchParams.has(key)) {
      modifiedUrl.searchParams.set(key, params[key]);
    } else {
      modifiedUrl.searchParams.append(key, params[key]);
    }
  });

  return modifiedUrl.toString().replace(tmpBase, '');
};

export const useInjectCrowdshipQuery = (): ((path: string) => string) => {
  const { query } = useRouter();

  return (path: string) => {
    const { myCrowdship } = query;

    if (myCrowdship) {
      return addQueryParamsToUrl(path, { myCrowdship });
    }

    return path;
  };
};
