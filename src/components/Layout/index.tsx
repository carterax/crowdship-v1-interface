import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const showHeader = router.pathname === '/' ? false : true;

  return (
    <main>
      {showHeader && <Header />}
      {children}
      <Footer />
    </main>
  );
};
