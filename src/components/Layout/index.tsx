import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();

  const showComponent = (paths: string[]) => !paths.includes(pathname);

  return (
    <main>
      {showComponent(['/', '/my-crowdship/[campaignFactory]/launch']) && (
        <Header />
      )}
      {children}
      {showComponent(['/', '/my-crowdship/[campaignFactory]/launch']) && (
        <Footer />
      )}
    </main>
  );
};
