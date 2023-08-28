import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={inter.className}>
			<QueryClientProvider client={queryClient}>
				<GoogleOAuthProvider clientId="991386349229-hb2b1fjfh2v80don6jb282dnbd311oan.apps.googleusercontent.com">
					<Component {...pageProps} />
					<Toaster />
					<ReactQueryDevtools />
				</GoogleOAuthProvider>
			</QueryClientProvider>
		</div>
	);
}
