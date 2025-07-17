import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import Header from '@/components/Header'; // Não importa o Header aqui

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
        {/* O Header foi removido daqui porque agora ele é incluído apenas em páginas específicas (home, apresentacao, servicos) */}
        {children}
      </body>
    </html>
  );
}