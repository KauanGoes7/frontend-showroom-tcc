// src/app/apresentacao/page.tsx
'use client'; // Necessário para usar o Header que é client component

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- ADICIONADO: Importação do useRouter

// --- INÍCIO DA ADIÇÃO DO BOTÃO DE VOLTAR ---
const BackButton = () => {
  const router = useRouter();
  return (
    // Estilos inline aplicados ao div para posicionamento
    <div style={{
      position: 'absolute', // Posiciona o botão de forma absoluta em relação ao pai com position: relative
      top: '20px',          // 20px de distância do topo
      left: '20px',         // 20px de distância da esquerda
      zIndex: 1000,         // Garante que o botão fique acima de outros elementos
    }}>
      <button
        onClick={() => router.back()}
        style={{
          background: 'none', // Sem fundo
          border: 'none',     // Sem borda
          cursor: 'pointer',  // Cursor de mão ao passar o mouse
          padding: '0',       // Sem preenchimento interno
          display: 'flex',    // Para centralizar a imagem se necessário
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/servicos/seta-para-a-esquerda 3.png" // Caminho da sua imagem (ajuste se for diferente para esta página)
          alt="Voltar"
          width={32} // Largura da imagem
          height={32} // Altura da imagem
          style={{
            // Filtro para a cor azul rgb(0, 187, 212)
            filter: 'invert(53%) sepia(91%) saturate(301%) hue-rotate(139deg) brightness(98%) contrast(101%)',
          }}
        />
      </button>
    </div>
  );
};
// --- FIM DA ADIÇÃO DO BOTÃO DE VOLTAR ---


export default function ApresentacaoPage() {
  return (
    <div className="apresentacao-container">
      <Head>
        <title>Agenda Corte - Nossa História</title>
        <meta name="description" content="Conheça a história, filosofia e diferenciais da Barbearia Agenda Corte." />
      </Head>

      {/* --- USO DO BOTÃO DE VOLTAR (ADICIONADO AQUI) --- */}
      <BackButton />
      {/* --- FIM DO USO DO BOTÃO DE VOLTAR --- */}

      <main className="apresentacao-main-content">
        <section className="hero-apresentacao">
          <div className="apresentacao-logo-wrapper">
            <Image
              src="/image 4-Photoroom 2.png" // Sua logo principal
              alt="Agenda Corte Logo"
              width={250}
              height={250}
              priority
            />
          </div>
          <h1 className="apresentacao-title">Bem-vindo à Experiência Agenda Corte</h1>
          <p className="apresentacao-subtitle">Mais do que um corte, um estilo de vida.</p>
        </section>

        <section className="apresentacao-section background-dark-alt">
          <h2 className="section-heading">Nossa História e Paixão</h2>
          <p>
            Fundada em [Ano], a Agenda Corte nasceu de uma paixão genuína pela arte da barbearia clássica e moderna.
            Nosso objetivo sempre foi ir além do simples corte de cabelo ou barba, buscando oferecer uma experiência
            completa de cuidado e bem-estar masculino. Desde o primeiro dia, dedicamo-nos a criar um ambiente onde
            tradição e inovação se encontram, proporcionando um refúgio para o homem contemporâneo.
          </p>
          <p>
            Acreditamos que cada cliente é único, e por isso, nossos serviços são personalizados para atender às
            suas necessidades e realçar sua individualidade. Com uma equipe de barbeiros talentosos e apaixonados
            pelo que fazem, garantimos um atendimento de excelência, onde cada detalhe é cuidadosamente planejado.
          </p>
        </section>

        <section className="apresentacao-section">
          <h2 className="section-heading">Nossos Valores</h2>
          <ul className="values-list">
            <li>**Excelência:** Buscamos a perfeição em cada serviço, da tesoura ao atendimento.</li>
            <li>**Tradição:** Honramos as raízes da barbearia, utilizando técnicas clássicas e produtos de qualidade.</li>
            <li>**Inovação:** Estamos sempre atualizados com as últimas tendências e tecnologias do mercado.</li>
            <li>**Respeito:** Valorizamos cada cliente, oferecendo um ambiente acolhedor e profissional.</li>
            <li>**Paixão:** Amamos o que fazemos e isso se reflete em nosso trabalho.</li>
          </ul>
        </section>

        <section className="apresentacao-section background-dark-alt">
          <h2 className="section-heading">Um Ambiente, Uma Experiência Única</h2>
          <p>
            Na Agenda Corte, cada detalhe do nosso espaço foi cuidadosamente planejado para oferecer mais do que um serviço:
            uma verdadeira experiência de conforto e exclusividade. Relaxe em nossas poltronas clássicas, desfrute de um
            café ou bebida especial e permita-se um momento de cuidado e rejuvenescimento. Nosso ambiente é um refúgio
            onde a tradição e o bom gosto se encontram.
          </p>
          <p>
            Criamos um local que reflete a essência da barbearia moderna, com um toque clássico, proporcionando uma
            atmosfera acolhedora e masculina. Seja para um corte rápido no dia a dia ou para um ritual completo de barba,
            você encontrará na Agenda Corte o espaço ideal para cuidar de si e recarregar as energias.
          </p>
        </section>

        <section className="apresentacao-section">
          <h2 className="section-heading">Nosso Compromisso com Você</h2>
          <p>
            Na Agenda Corte, seu conforto e satisfação são nossa prioridade. Utilizamos apenas produtos de alta qualidade,
            garantindo não só um visual impecável, mas também a saúde e o cuidado da sua pele e cabelo. Venha desfrutar
            de um momento só seu, em um ambiente pensado para o seu relaxamento e estilo.
          </p>
          <p>
            Estamos ansiosos para te receber e fazer parte da sua rotina de cuidados!
          </p>
        </section>

        {/* Removendo esta seção, pois o BackButton já cumpre a função de voltar */}
        {/* <section className="apresentacao-section back-button-section">
          <Link href="/" passHref>
            <button className="back-to-home-button">Voltar para Home</button>
          </Link>
        </section> */}
      </main>
    </div>
  );
}