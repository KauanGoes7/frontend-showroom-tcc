// src/app/page.tsx
import Head from 'next/head';
import Image from 'next/image';
import Header from './../components/Header'; // O Header será reintroduzido aqui
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="landing-page-container">
      <Head>
        <title>Barbearia Elite - Estilo e Tradição</title>
        <meta name="description" content="Agende seu corte, barba e tratamentos na Barbearia Elite. Estilo não se improvisa." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header /> {/* O Header que renderiza o cabeçalho da home */}

      <main className="main-content">
        <div className="hero-section">
          {/* Logo principal da barbearia (imagem) - Tamanho ajustado */}
          <div className="main-logo">
            <Image
              src="/image 4-Photoroom 2.png" // Caminho para sua logo principal
              alt="Agenda Corte Barbearia Logo"
              width={350} // Diminuído de 300 para 200
              height={300} // Diminuído de 300 para 200
              priority
            />
          </div>

          {/* Frases de efeito - Centralizadas */}
          <p className="tagline">Estilo não se improvisa.</p>
          <p className="tagline">Agende agora.</p>

          {/* Botão para agendamento, que leva para a página de serviços - Centralizado */}
          <Link href="/servicos" passHref>
            <button className="schedule-button">Agendar</button>
          </Link>
        </div>
      </main>
    </div>
  );
}