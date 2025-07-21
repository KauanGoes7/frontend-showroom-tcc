// src/app/confirmacao-agendamento/page.tsx
'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // <-- ADICIONADO: Importar Image para o BackButton

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
          src="/servicos/seta-para-a-esquerda 3.png" // Caminho da sua imagem
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

interface AgendamentoData {
  date: string;
  time: string;
  barberId: number;
  barberName: string;
  serviceIds: number[];
  serviceNames: string[];
}

export default function ConfirmacaoAgendamentoPage() {
  const [agendamento, setAgendamento] = useState<AgendamentoData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAgendamento = localStorage.getItem('agendamentoData');
      if (storedAgendamento) {
        try {
          const parsedAgendamento: AgendamentoData = JSON.parse(storedAgendamento);
          if (parsedAgendamento.date && parsedAgendamento.time && parsedAgendamento.barberName && parsedAgendamento.serviceNames && parsedAgendamento.serviceNames.length > 0) {
            setAgendamento(parsedAgendamento);
          } else {
            console.error("Dados de agendamento incompletos no localStorage.");
          }
        } catch (e) {
          console.error("Erro ao fazer parse dos dados de agendamento do localStorage", e);
        }
      } else {
        console.warn("Nenhum dado de agendamento encontrado no localStorage.");
      }
    }
  }, []);

  const handleNovoAgendamento = () => {
    localStorage.removeItem('agendamentoData');
    localStorage.removeItem('selectedServiceIds');
    localStorage.removeItem('selectedBarberId');
    localStorage.removeItem('selectedDate');
    localStorage.removeItem('selectedTime');

    router.push('/servicos');
  };

  const formatDisplayDate = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T00:00:00');
      if (isNaN(date.getTime())) {
        return "Data Inválida";
      }
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return "Data Inválida";
    }
  };

  if (!agendamento) {
    return (
      <div className="agendamento-container">
        <Head>
          <title>Agenda Corte - Agendamento</title>
        </Head>
        
        {/* --- USO DO BOTÃO DE VOLTAR (ADICIONADO AQUI TAMBÉM NO ESTADO DE CARREGAMENTO) --- */}
        <BackButton />
        {/* --- FIM DO USO DO BOTÃO DE VOLTAR --- */}

        <main className="agendamento-main-content" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>Carregando detalhes do agendamento ou dados não encontrados. Por favor, inicie um novo agendamento.</p>
          <button className="continue-button" onClick={() => router.push('/servicos')} style={{ marginTop: '2rem' }}>
            Ir para Novo Agendamento
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="agendamento-container">
      <Head>
        <title>Agenda Corte - Agendamento Concluído</title>
        <meta name="description" content="Seu agendamento foi concluído com sucesso!" />
      </Head>

      {/* --- USO DO BOTÃO DE VOLTAR (ADICIONADO AQUI) --- */}
      <BackButton />
      {/* --- FIM DO USO DO BOTÃO DE VOLTAR --- */}

      <main className="agendamento-main-content">
        <section className="confirmacao-hero">
          <h1 className="confirmacao-title">AGENDAMENTO CONCLUÍDO <span className="success-highlight">COM SUCESSO!</span></h1>
          <p className="confirmacao-whatsapp-message">
            🔔 Você receberá um lembrete pelo WhatsApp um dia antes do seu atendimento.
          </p>
        </section>

        <section className="agendamento-details-card">
          <div className="detail-item">
            <span className="detail-icon-emoji">🗓️</span>
            <div className="detail-text">
              <span className="detail-label">Data</span>
              <span className="detail-value">{formatDisplayDate(agendamento.date)}</span>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon-emoji">⏰</span>
            <div className="detail-text">
              <span className="detail-label">Horário</span>
              <span className="detail-value">{agendamento.time}</span>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon-emoji">👨‍🦰</span>
            <div className="detail-text">
              <span className="detail-label">Barbeiro</span>
              <span className="detail-value">{agendamento.barberName}</span>
            </div>
          </div>
          {agendamento.serviceNames && agendamento.serviceNames.length > 0 && (
            <div className="detail-item full-width-detail">
              <span className="detail-icon-emoji">✂️</span>
              <div className="detail-text">
                <span className="detail-label">Serviços</span>
                <span className="detail-value">{agendamento.serviceNames.join(', ')}</span>
              </div>
            </div>
          )}
        </section>

        <section className="agendamento-footer-message">
          <p>Muito obrigado pela confiança! Estamos ansiosos para te atender. 💈</p>
        </section>

        <section className="action-button-section">
          <button className="continue-button" onClick={handleNovoAgendamento}>
            Novo Agendamento
          </button>
        </section>
      </main>

      {/* Styled JSX para CSS local */}
      {/* ESTE BLOCO <style jsx> NÃO SERÁ ALTERADO */}
      <style jsx>{`
        .agendamento-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--background-dark);
          color: var(--text-light);
        }

        .agendamento-main-content {
          flex-grow: 1;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          max-width: 800px; /* Ajustado para ser um pouco mais contido */
          margin: 0 auto;
          width: 100%;
        }

        .confirmacao-hero {
          margin-bottom: 2.5rem;
          color: var(--text-light);
        }

        .confirmacao-title {
          font-size: 2.2rem; /* Levemente diminuído */
          font-weight: bold;
          margin-bottom: 0.8rem;
          color: var(--accent-light-blue);
        }

        .success-highlight {
          color: var(--accent-cyan);
        }

        .confirmacao-whatsapp-message {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem; /* Levemente diminuído */
          color: var(--text-secondary);
          gap: 0.5rem;
        }

        /* CARD DE DETALHES DO AGENDAMENTO */
        .agendamento-details-card {
          background-color: var(--card-background);
          border-radius: 12px;
          padding: 1.8rem; /* Diminuído o padding */
          margin-bottom: 2rem; /* Diminuído a margem */
          width: 100%;
          max-width: 400px; /* Mais ajustado, como na imagem de referência */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
        }

        .detail-item {
          display: flex;
          align-items: center;
          margin-bottom: 1.2rem; /* Espaçamento entre os itens diminuído */
          justify-content: flex-start;
        }

        .detail-item:last-child {
          margin-bottom: 0;
        }

        .detail-icon-emoji {
          font-size: 2.2rem; /* Tamanho do emoji ajustado */
          line-height: 1;
          margin-right: 1rem; /* Espaçamento ajustado */
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px; /* Para manter o alinhamento */
        }

        .detail-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .detail-label {
          font-size: 0.9rem; /* Levemente diminuído */
          color: var(--text-secondary);
          margin-bottom: 0.1rem; /* Ajustado */
        }

        .detail-value {
          font-size: 1.2rem; /* Levemente diminuído */
          font-weight: bold;
          color: var(--accent-cyan);
        }

        .full-width-detail {
            /* Mantido, caso tenha estilos específicos para largura total */
        }

        .agendamento-footer-message {
          font-size: 1rem; /* Levemente diminuído */
          color: var(--text-secondary);
          margin-bottom: 2.5rem; /* Diminuído */
        }

        .action-button-section {
          width: 100%;
          max-width: 280px; /* Ajustado para ser menor */
        }

        .continue-button {
          /* Alterações para corresponder ao azul claro */
          background-color: var(--accent-cyan); /* Cor azul clara */
          color: var(--button-primary-text); /* Geralmente branco ou cinza bem claro */
          padding: 0.8rem 2rem; /* Padding ajustado */
          border-radius: 8px;
          font-size: 1.15rem; /* Tamanho da fonte ajustado */
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          width: 100%;
          box-shadow: 0 4px 15px rgba(0, 190, 255, 0.4);
        }

        .continue-button:hover {
          background-color: #00bcd4; /* Um tom um pouco mais escuro para o hover do azul claro */
          transform: translateY(-2px);
        }

        .continue-button:active {
          transform: translateY(0);
        }

        /* Media Queries para responsividade */
        @media (max-width: 768px) {
          .confirmacao-title {
            font-size: 2rem;
          }

          .agendamento-details-card {
            padding: 1.5rem;
            max-width: 90%;
          }

          .detail-item {
            margin-bottom: 1rem;
          }

          .detail-icon-emoji {
            font-size: 2rem;
            margin-right: 1rem;
          }

          .detail-value {
            font-size: 1.1rem;
          }

          .confirmacao-whatsapp-message,
          .agendamento-footer-message {
            font-size: 0.95rem;
          }

          .continue-button {
            font-size: 1.05rem;
            padding: 0.7rem 1.6rem;
          }
        }

        @media (max-width: 480px) {
          .agendamento-main-content {
            padding: 1.5rem 0.8rem;
          }

          .confirmacao-title {
            font-size: 1.7rem;
          }

          .detail-icon-emoji {
            font-size: 1.8rem;
            margin-right: 0.7rem;
          }

          .detail-value {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}