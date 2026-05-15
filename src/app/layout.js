import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientShell from './components/ClientShell';
import AuthProvider from './components/AuthProvider';
import RazorpayScript from './components/RazorpayScript';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  title: 'VoyarWear | Premium Handcrafted Eyewear',
  description:
    'Discover handcrafted eyewear at the intersection of precision engineering and timeless aesthetics. Optical frames and sunglasses for the discerning eye.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <RazorpayScript />
        <AuthProvider>
          <ClientShell>{children}</ClientShell>
        </AuthProvider>
      </body>
    </html>
  );
}
