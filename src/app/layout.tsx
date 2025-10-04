import React from "react";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Dashboard',
    default: 'Admin Dashboard',
  },
  description: 'Proxy server admin dashboard.',
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({ children }: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
