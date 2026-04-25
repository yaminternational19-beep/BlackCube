'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-primary-black text-primary-gray">
      <CustomCursor />
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
