'use client';

import { HelmetProvider as Provider } from 'react-helmet-async';
import { ReactNode } from 'react';

export default function HelmetProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
