import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { useRouter } from 'next/router';

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const showHeader = router.pathname === '/' ? false : true;

  return (
    <main>
      {showHeader && <Header />}
      {children}
    </main>
  );
};
