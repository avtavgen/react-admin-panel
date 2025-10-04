import React from 'react';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type {Metadata} from "next";
import {headers} from "next/headers";


export async function generateMetadata(): Promise<Metadata> {
  const local_headers = await headers();
  const host = local_headers.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  return {
    title: {
      template: '%s | Admin Panel',
      default: 'Admin Panel',
    },
    description: 'UvProxy Admin Panel.',
    metadataBase: new URL(`${protocol}://${host}`),
  };
}


export default async function RootLayout({ children }: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
