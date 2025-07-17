// src/app/confirmacao-agendamento/page.tsx
'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmacaoPage() {
  const [agendamentoData, setAgendamentoData] = useState({
    data: '[Data do Agendamento]',
    horario: '[Horário do Agendamento]',
    barbeiro: '[Nome do Barbeiro]',
    servico: '[Serviço Escolhido]',
  });
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('agendamentoConfirmado');
    if (storedData) {
      setAgendamentoData(JSON.parse(storedData));
    } else {
      console.warn("Nenhum dado de agendamento encontrado no localStorage. Redirecionando para agendamento.");
      router.push('/agendar-data'); // Redireciona de volta se não houver dados
    }
  }, [router]); // Adicionado router como dependência para o useEffect

  const handleNovoAgendamento = () => {
    localStorage.removeItem('agendamentoConfirmado'); // Limpa os dados
    router.push('/'); // Volta para a Home Page
  };

  return (
    <div className="confirmacao-container">
      <Head>
        <title>Agenda Corte - Agendamento Concluído</title>
        <meta name="description" content="Seu agendamento foi concluído com sucesso!" />
      </Head>

      <Header />

      <main className="confirmacao-main-content">
        <section className="confirmacao-hero">
          <h1 className="confirmacao-title">AGENDAMENTO CONCLUÍDO <span className="confirmacao-highlight">COM SUCESSO!</span></h1>
          <div className="whatsapp-reminder">
            <Image
              src="/icones/bell-whatsapp.png" // Ajuste este caminho se seu ícone for diferente
              alt="Lembrete WhatsApp"
              width={24}
              height={24}
            />
            <p>Você receberá um lembrete pelo WhatsApp um dia antes do seu atendimento.</p>
          </div>
        </section>

        <section className="agendamento-details-card">
          <div className="detail-item">
            <Image
              src="/icones/calendar.png"
              alt="Data"
              width={24}
              height={24}
            />
            <span>Data</span>
            <strong>{agendamentoData.data}</strong>
          </div>

          <div className="detail-item">
            <Image
              src="/icones/clock.png"
              alt="Horário"
              width={24}
              height={24}
            />
            <span>Horário</span>
            <strong>{agendamentoData.horario}</strong>
          </div>

          <div className="detail-item">
            <Image
              src="/icones/barber-icon.png" // Ajuste este caminho se seu ícone for diferente
              alt="Barbeiro"
              width={24}
              height={24}
            />
            <span>Barbeiro</span>
            <strong>{agendamentoData.barbeiro}</strong>
          </div>

          <div className="detail-item">
            <Image
              src="/icones/service-icon.png" // Ajuste este caminho se seu ícone for diferente
              alt="Serviço"
              width={24}
              height={24}
            />
            <span>Serviço</span>
            <strong>{agendamentoData.servico}</strong>
          </div>
        </section>

        <section className="final-message-section">
          <p>Muito obrigado pela confiança! Estamos ansiosos para te atender. ✂️</p>
        </section>

        <section className="new-agendamento-section">
          <button
            className="continue-button"
            onClick={handleNovoAgendamento}
          >
            Novo Agendamento
          </button>
        </section>
      </main>
    </div>
  );
}