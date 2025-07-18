// src/app/barbeiros/page.tsx
'use client'; // Necessário para usar hooks do React (useState, etc.)

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react'; // Para gerenciar o estado do barbeiro selecionado

export default function BarbeirosPage() {
  // Estado para armazenar o ID do barbeiro selecionado
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null);

  // Array de objetos para representar os barbeiros.
  const barbers = [
    { id: 1, name: 'Lucas', image: '/barbeiro/barbeiro 1.png' },
    { id: 2, name: 'Rodrigo', image: '/barbeiro/barbeiro 1.png' },
    { id: 3, name: 'Marcelo', image: '/barbeiro/barbeiro 1.png' },
  ];

  // Função para lidar com a seleção do barbeiro
  const handleBarberSelect = (barberId: number) => {
    // Se o barbeiro já estiver selecionado, deseleciona. Senão, seleciona.
    setSelectedBarberId(prevId => (prevId === barberId ? null : barberId));
  };

  return (
    <div className="barbeiros-container">
      <Head>
        <title>Agenda Corte - Escolha seu Barbeiro</title>
        <meta name="description" content="Escolha seu barbeiro preferido na Agenda Corte." />
      </Head>

      

      <main className="barbeiros-main-content">
        <section className="barbeiros-hero">
          <h1 className="barbeiros-title">ESCOLHA O SEU <span className="barbeiro-highlight">BARBEIRO!</span></h1>
          <p className="barbeiros-description">
            Na nossa agenda de cortes, você pode selecionar o barbeiro que melhor combina com o seu estilo! Cada profissional
            tem suas especialidades e horários disponíveis.
          </p>
        </section>

        <section className="barbeiros-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          {barbers.map(barber => (
            <div
              key={barber.id}
              className={`barber-card ${selectedBarberId === barber.id ? 'selected-barber' : ''}`}
              onClick={() => handleBarberSelect(barber.id)}
              style={{ width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1rem', textAlign: 'left' }}
            >
              <div className="barber-icon-wrapper" style={{ width: '70px', height: '70px', marginRight: '1rem' }}>
                <Image
                  src={barber.image}
                  alt={`Foto de ${barber.name}`}
                  width={70}
                  height={70}
                  priority
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <h2 className="barber-name" style={{ fontSize: '1.3rem', marginBottom: 0 }}>{barber.name}</h2>
              {/* Você pode adicionar mais detalhes aqui se quiser, como especialidades */}
            </div>
          ))}
        </section>

        <section className="continue-button-section">
          {/* O botão "Continua" agora aponta para a nova rota /agendar-data */}
          <Link href="/agendar-data" passHref>
            <button className="continue-button" disabled={selectedBarberId === null}>
              Continua
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}