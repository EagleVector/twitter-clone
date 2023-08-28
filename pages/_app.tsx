import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';


const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId="991386349229-hb2b1fjfh2v80don6jb282dnbd311oan.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster />
      </GoogleOAuthProvider>
    </div>
  );
}
