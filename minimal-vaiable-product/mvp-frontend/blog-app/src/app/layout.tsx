import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Personal Blog',
  description: 'A blog about my thoughts and experiences',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <header className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">
              My Personal Blog
            </h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto py-6 px-4">{children}</main>
      </body>
    </html>
  );
}
