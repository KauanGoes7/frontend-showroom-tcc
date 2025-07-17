// src/app/agendar-data/page.tsx
'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AgendamentoPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null);

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

  useEffect(() => {
    const storedBarberId = localStorage.getItem('selectedBarberId');
    const storedServiceId = localStorage.getItem('selectedServiceId');

    if (storedBarberId) {
      setSelectedBarberId(parseInt(storedBarberId));
    }
    if (storedServiceId) {
      setSelectedServiceId(parseInt(storedServiceId));
    }
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmAgendamento = () => {
    if (selectedDate && selectedTime && selectedBarberId && selectedServiceId) {
      const barberName = barbers.find(b => b.id === selectedBarberId)?.name || 'Barbeiro Desconhecido';
      const serviceName = servicesMap[selectedServiceId] || 'Serviço Desconhecido';

      const agendamento = {
        data: new Date(selectedDate).toLocaleDateString('pt-BR'),
        horario: selectedTime,
        barbeiro: barberName,
        servico: serviceName,
      };

      localStorage.setItem('agendamentoConfirmado', JSON.stringify(agendamento));

      // Removendo o alert e redirecionando diretamente
      router.push('/confirmacao-agendamento');
    } else {
      // Se faltar algum dado, pode-se manter um alert ou uma mensagem na tela
      alert('Por favor, selecione uma data, um horário, um barbeiro e um serviço.');
    }
  };

  return (
    <div className="agendamento-container">
      <Head>
        <title>Agenda Corte - Agendar Horário</title>
        <meta name="description" content="Selecione a data e horário para seu agendamento." />
      </Head>

      <Header />

      <main className="agendamento-main-content">
        <section className="agendamento-hero">
          <h1 className="agendamento-title">SELECIONE <span className="agendamento-highlight">DATA E HORA</span></h1>
          <p className="agendamento-description">
            Escolha a data e o horário que melhor se encaixam na sua rotina.
          </p>
        </section>

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
                  {new Date(date).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
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
            disabled={!selectedDate || !selectedTime}
          >
            Confirmar Agendamento
          </button>
        </section>
      </main>
    </div>
  );
}