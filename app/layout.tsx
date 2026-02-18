import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AYELE REAL-ESTATE - Find Your Perfect Home with Ease',
  description:
    'Discover your dream home with AYELE-Housing. Browse listings, connect with agents, and make informed decisions with our user-friendly platform.',

  icons: {
    icon: 'https://res.cloudinary.com/dobairxju/image/upload/v1770385434/logo2_k0955s.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="mt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
