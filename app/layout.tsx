import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HeaderBar from '../components/Header';
import { AuthProvider } from './../utils/auth/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <AuthProvider>
        <body className={inter.className}>
          <HeaderBar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
