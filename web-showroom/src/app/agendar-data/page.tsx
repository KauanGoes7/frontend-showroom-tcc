// src/app/agendar-data/page.tsx
'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Importar o componente Header (assumindo que ele está em src/components/Header.tsx)
import Header from '../../components/Header'; // Adicionado para incluir o cabeçalho

export default function AgendamentoPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]); // Para os serviços
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null); // Para o barbeiro

  const router = useRouter();

  const availableDates = [
    '2025-07-18',
    '2025-07-19',
    '2025-07-20',
    '2025-07-21',
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00',
  ];

  const barbers = [
    { id: 1, name: 'Lucas' },
    { id: 2, name: 'Rodrigo' },
    { id: 3, name: 'Marcelo' },
  ];

  const servicesMap: { [key: number]: string } = {
    1: 'Degradê médio + detalhe fino na navalha',
    2: 'Low Fade + Topo Texturizado',
    3: 'Buzz Cut + Linha de Contorno',
    101: 'Degradê perfeito dos lados + detalhes artísticos',
    102: 'Stuble Texturizado',
    103: 'Van Dyke',
    201: 'Degradê perfeito dos lados + detalhes artísticos (Corte+Barba)',
    202: 'O Rebelde Controlado',
    203: 'O Minimalista Sofisticado',
  };

  // Carrega os dados do localStorage ao montar o componente
  useEffect(() => {
    if (typeof window !== 'undefined') { // Garante que roda apenas no lado do cliente
      const storedBarberId = localStorage.getItem('selectedBarberId');
      if (storedBarberId) {
        setSelectedBarberId(parseInt(storedBarberId));
      }

      const storedServiceIds = localStorage.getItem('selectedServiceIds');
      if (storedServiceIds) {
        setSelectedServiceIds(JSON.parse(storedServiceIds));
      }

      // Opcional: Se quiser carregar data/hora se o usuário voltar para essa página
      const storedDate = localStorage.getItem('selectedDate');
      const storedTime = localStorage.getItem('selectedTime');
      if (storedDate) setSelectedDate(storedDate);
      if (storedTime) setSelectedTime(storedTime);
    }
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reseta o horário ao mudar a data
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmAgendamento = () => {
    if (!selectedDate || !selectedTime || selectedBarberId === null || selectedServiceIds.length === 0) {
      alert('Por favor, selecione a data, o horário, o barbeiro e o serviço para confirmar.');
      return;
    }

    // Prepara os dados para salvar
    const barberName = barbers.find(b => b.id === selectedBarberId)?.name || 'Barbeiro Desconhecido';
    const selectedServiceNames = selectedServiceIds.map(id => servicesMap[id] || 'Serviço Desconhecido');

    // Salva todos os dados no localStorage para a página de confirmação
    localStorage.setItem('agendamentoData', JSON.stringify({
      date: selectedDate,
      time: selectedTime,
      barberId: selectedBarberId,
      barberName: barberName,
      serviceIds: selectedServiceIds,
      serviceNames: selectedServiceNames, // Salva os nomes para facilitar na confirmação
    }));

    router.push('/confirmacao-agendamento');
  };

  // O botão 'Confirmar Agendamento' estará desabilitado se as seleções não estiverem completas.
  const isConfirmButtonDisabled = !selectedDate || !selectedTime || selectedBarberId === null || selectedServiceIds.length === 0;

  // Função auxiliar para formatar a data para exibição nos botões
  const formatDateForButton = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00'); // Adiciona T00:00:00 para evitar problemas de fuso horário
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  // Obter o nome do barbeiro e serviço para exibição no resumo
  const currentSelectedBarberName = barbers.find(b => b.id === selectedBarberId)?.name || 'Nenhum barbeiro selecionado';
  const currentSelectedServiceNames = selectedServiceIds.map(id => servicesMap[id] || 'Serviço Desconhecido').join(', ');


  return (
    <div className="agendamento-container">
      <Head>
        <title>Agenda Corte - Agendar Horário</title>
        <meta name="description" content="Selecione a data e horário para seu agendamento." />
      </Head>

      <Header /> {/* Inclui o cabeçalho */}

      <main className="agendamento-main-content">
        <section className="agendamento-hero">
          <h1 className="agendamento-title">SELECIONE <span className="agendamento-highlight">DATA E HORA</span></h1>
          <p className="agendamento-description">
            Escolha a data e o horário que melhor se encaixam na sua rotina.
          </p>
        </section>

        {/* Card de Resumo da Seleção Atual (Barbeiro e Serviço) */}
        {(selectedBarberId !== null || selectedServiceIds.length > 0) && (
            <div className="selection-card summary-card">
                <h2 className="selection-card-title">Resumo da Seleção</h2>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem'}}>
                    {selectedBarberId !== null && <p style={{color: 'var(--text-light)', fontSize: '1.1rem'}}>Barbeiro: <span style={{color: 'var(--accent-cyan)', fontWeight: 'bold'}}>{currentSelectedBarberName}</span></p>}
                    {selectedServiceIds.length > 0 && <p style={{color: 'var(--text-light)', fontSize: '1.1rem'}}>Serviços: <span style={{color: 'var(--accent-cyan)', fontWeight: 'bold'}}>{currentSelectedServiceNames}</span></p>}
                </div>
            </div>
        )}

        <section className="agendamento-selections">
          <div className="selection-card">
            <h2 className="selection-card-title">Escolha a Data</h2>
            <div className="date-selection-grid">
              {availableDates.map(date => (
                <button
                  key={date}
                  className={`date-button ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(date)}
                >
                  {formatDateForButton(date)}
                </button>
              ))}
            </div>
          </div>

          <div className="selection-card">
            <h2 className="selection-card-title">Escolha o Horário</h2>
            <div className="time-selection-grid">
              {availableTimes.map(time => (
                <button
                  key={time}
                  className={`time-button ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => handleTimeSelect(time)}
                  disabled={!selectedDate}
                >
                  {time}
                </button>
              ))}
            </div>
            {!selectedDate && (
              <p className="selection-tip">Por favor, selecione uma data primeiro para ver os horários.</p>
            )}
          </div>
        </section>

        <section className="confirm-agendamento-section">
          <button
            className="continue-button"
            onClick={handleConfirmAgendamento}
            disabled={isConfirmButtonDisabled}
          >
            Confirmar Agendamento
          </button>
        </section>
      </main>
    </div>
  );
}