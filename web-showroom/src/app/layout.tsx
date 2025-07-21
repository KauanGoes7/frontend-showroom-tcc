import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Showroom Barbearia',
  description: 'Seu showroom online para agendamentos de barbearia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {}
        {children}
      </body>
    </html>
  );
}