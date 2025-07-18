// src/app/confirmacao-agendamento/page.tsx
'use client';

import Head from 'next/head';
import Image from 'next/image'; // Mantemos Image para o ícone do WhatsApp, que já estava no seu código original
import Link from 'next/link';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AgendamentoConfirmado {
  data: string;
  horario: string;
  barbeiro: string;
  servico: string;
}

export default function ConfirmacaoPage() {
  const [agendamentoData, setAgendamentoData] = useState<AgendamentoConfirmado>({
    data: '...',
    horario: '...',
    barbeiro: '...',
    servico: '...',
  });
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('agendamentoConfirmado');
    if (storedData) {
      setAgendamentoData(JSON.parse(storedData));
    } else {
      console.warn("Nenhum dado de agendamento encontrado no localStorage. Redirecionando.");
      router.push('/agendar-data'); // Redireciona de volta se não houver dados
      return; // Importante para parar a execução e evitar renderizar com dados vazios
    }
  }, [router]);

  const handleNovoAgendamento = () => {
    // Limpa todos os dados relevantes do localStorage
    localStorage.removeItem('agendamentoConfirmado');
    localStorage.removeItem('selectedBarberId'); // Exemplo, se você tiver mais dados de seleção
    localStorage.removeItem('selectedServiceId'); // Exemplo, se você tiver mais dados de seleção
    router.push('/'); // Volta para a Home Page
  };

  return (
    <div className="confirmacao-container">
      <Head>
        <title>Agenda Corte - Agendamento Concluído</title>
        <meta name="description" content="Seu agendamento foi concluído com sucesso!" />
      </Head>

      <Header /> {/* O Header será o de páginas internas automaticamente */}

      <main className="confirmacao-main-content">
        <section className="confirmacao-hero">
          <h1 className="confirmacao-title">AGENDAMENTO CONCLUÍDO<br/><span className="highlight-text">COM SUCESSO!</span></h1>
          <p className="confirmacao-whatsapp-reminder">
            {/* Mantido o ícone do WhatsApp, pois já estava no seu código original e é uma imagem existente */}
            <Image
              src="/icones/bell-whatsapp.png"
              alt="Lembrete WhatsApp"
              width={20}
              height={20}
              priority
              className="whatsapp-icon"
            />
            Você receberá um lembrete pelo WhatsApp um dia antes do seu atendimento.
          </p>
        </section>

        {/* Novo Card de Detalhes do Agendamento */}
        <div className="confirmed-appointment-card-v2">
          <div className="card-detail-item">
            <span className="detail-card-icon-emoji">🗓️</span> {/* Ícone de calendário (emoji) */}
            <span className="detail-card-label">Data</span>
            <span className="detail-card-value">{agendamentoData.data}</span>
          </div>

          <div className="card-detail-item">
            <span className="detail-card-icon-emoji">⏰</span> {/* Ícone de relógio (emoji) */}
            <span className="detail-card-label">Horário</span>
            <span className="detail-card-value">{agendamentoData.horario}</span>
          </div>

          <div className="card-detail-item">
            <span className="detail-card-icon-emoji">👨‍🦱</span> {/* Ícone de pessoa (emoji) */}
            <span className="detail-card-label">Barbeiro</span>
            <span className="detail-card-value">{agendamentoData.barbeiro}</span>
          </div>

          <div className="card-detail-item">
            <span className="detail-card-icon-emoji">✂️</span> {/* Ícone de tesoura (emoji) */}
            <span className="detail-card-label">Serviço</span>
            <span className="detail-card-value">{agendamentoData.servico}</span>
          </div>
        </div>

        <section className="confirmation-actions">
          <p className="final-message">
            Muito obrigado pela confiança! Estamos ansiosos para te atender. 💈
          </p>
          <button className="new-appointment-button" onClick={handleNovoAgendamento}>
            Novo Agendamento
          </button>
        </section>
      </main>
    </div>
  );
}