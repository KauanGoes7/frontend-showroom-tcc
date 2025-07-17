// src/app/page.tsx
import Head from 'next/head'; // Para metadados da página
import Image from 'next/image'; // Para otimizar o carregamento de imagens no Next.js
import Header from '../components/Header'; // Importa o componente de cabeçalho
import Link from 'next/link'; // Para o botão de navegação

export default function HomePage() {
  return (
    <div className="landing-page-container">
      <Head>
        <title>Barbearia Elite - Estilo e Tradição</title>
        <meta name="description" content="Agende seu corte, barba e tratamentos na Barbearia Elite. Estilo não se improvisa." />
        <link rel="icon" href="/favicon.ico" /> {/* Ícone da aba do navegador */}
      </Head>

      <Header /> {/* Inclui o componente de cabeçalho */}

      <main className="main-content">
        {/* A imagem de fundo e o overlay foram removidos. O fundo agora é definido pelo CSS global (body/html). */}

        <div className="hero-section">
          {/* Logo principal da barbearia (imagem) */}
          <div className="main-logo">
            <Image
              src="/image 4-Photoroom 2.png" // <--- CAMINHO ATUALIZADO para sua logo principal
              alt="Agenda Corte Barbearia Logo"
              width={300} // Largura da imagem
              height={300} // Altura da imagem
              priority // Prioriza o carregamento desta imagem (importante para elementos acima da dobra)
            />
          </div>

          {/* Frases de efeito */}
          <p className="tagline">Estilo não se improvisa.</p>
          <p className="tagline">Agende agora.</p>

          {/* Botão para agendamento, que leva para a página de serviços */}
          <Link href="/servicos" passHref>
            <button className="schedule-button">Agendar</button>
          </Link>
        </div>
      </main>

      {/* O rodapé inferior foi removido, conforme solicitado. */}
    </div>
  );
}