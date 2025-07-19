// src/app/barbeiros/page.tsx
'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Importar useEffect
import { useRouter } from 'next/navigation'; // Importar useRouter


export default function BarbeirosPage() {
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]); // Para carregar os serviços
  const router = useRouter();

  // Dados dos barbeiros (mantidos como você os tinha)
  const barbers = [
    { id: 1, name: 'Lucas', image: '/barbeiro/barbeiro 1.png' },
    { id: 2, name: 'Rodrigo', image: '/barbeiro/barbeiro 1.png' },
    { id: 3, name: 'Marcelo', image: '/barbeiro/barbeiro 1.png' },
  ];

  // Carrega o barbeiro e os serviços selecionados do localStorage ao montar
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
    }
  }, []);

  const handleBarberSelect = (barberId: number) => {
    setSelectedBarberId(barberId);
  };

  const handleContinue = () => {
    if (selectedBarberId !== null) {
      // Salva o ID do barbeiro selecionado no localStorage
      localStorage.setItem('selectedBarberId', selectedBarberId.toString());
      router.push('/agendar-data'); // Navega para a próxima tela
    } else {
      alert('Por favor, selecione um barbeiro para continuar.');
    }
  };

  // Funções auxiliares para mapear IDs de serviço para nomes (opcional, mas útil para o resumo)
  const servicesMap: { [key: number]: string } = {
    1: 'Degradê médio + detalhe fino na navalha',
    2: 'Low Fade + Topo Texturizado',
    3: 'Buzz Cut + Linha de Contorno',
    101: 'Degradê perfeito dos lados + detalhes artísticos', // Assumindo IDs únicos para barba
    102: 'Stuble Texturizado',
    103: 'Van Dyke',
    201: 'Degradê perfeito dos lados + detalhes artísticos (Corte+Barba)', // Assumindo IDs únicos para corte+barba
    202: 'O Rebelde Controlado',
    203: 'O Minimalista Sofisticado',
  };

  // Nomes dos serviços selecionados para exibição
  const selectedServiceNames = selectedServiceIds.map(id => servicesMap[id] || `Serviço ID: ${id}`).join(', ');

  return (
    <div className="barbeiros-container">
      <Head>
        <title>Agenda Corte - Escolha o Barbeiro</title>
        <meta name="description" content="Selecione seu barbeiro preferido para o agendamento." />
      </Head>

      

      <main className="barbeiros-main-content">
        <section className="barbeiros-hero">
          <h1 className="barbeiros-title">ESCOLHA O <span className="barbeiro-highlight">SEU BARBEIRO</span></h1>
          <p className="barbeiros-description">
            Selecione o profissional que irá cuidar do seu estilo.
          </p>
          {/* Opcional: Mostrar os serviços selecionados */}
          {selectedServiceIds.length > 0 && (
            <p className="barbeiros-description" style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--accent-cyan)' }}>
              Serviços selecionados: {selectedServiceNames}
            </p>
          )}
        </section>

        <section className="barbeiros-list">
          {barbers.map(barber => (
            <div
              key={barber.id}
              className={`barber-card ${selectedBarberId === barber.id ? 'selected-barber' : ''}`}
              onClick={() => handleBarberSelect(barber.id)}
            >
              <div className="barber-icon-wrapper">
                <Image
                  src={barber.image}
                  alt={barber.name}
                  width={70}
                  height={70}
                  priority
                />
              </div>
              <p className="barber-name">{barber.name}</p>
            </div>
          ))}
        </section>

        <section className="continue-button-section">
          <button
            className="continue-button"
            onClick={handleContinue}
            disabled={selectedBarberId === null} // Desabilita se nenhum barbeiro for selecionado
          >
            Continua
          </button>
        </section>
      </main>
    </div>
  );
}