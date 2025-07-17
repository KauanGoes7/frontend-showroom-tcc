// src/app/servicos/page.tsx
'use client'; // Necessário para usar hooks do React no Next.js App Router

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header'; // O cabeçalho comum (agora com lógica condicional)
import { useState } from 'react'; // Importar useState

export default function ServicosPage() {
  // Estado para controlar os serviços selecionados.
  // Será um array de arrays, onde cada sub-array guarda os IDs dos serviços selecionados por categoria.
  const [selectedServices, setSelectedServices] = useState<number[][]>([[], [], []]);

  // Função para lidar com a seleção de um serviço
  const handleServiceSelect = (categoryIndex: number, serviceId: number) => {
    setSelectedServices(prevSelectedServices => {
      const newSelected = [...prevSelectedServices];
      const categorySelections = newSelected[categoryIndex];

      // Se o serviço já está selecionado, deseleciona
      if (categorySelections.includes(serviceId)) {
        newSelected[categoryIndex] = categorySelections.filter(id => id !== serviceId);
      } else {
        // Se o serviço não está selecionado, adiciona
        newSelected[categoryIndex] = [...categorySelections, serviceId];
      }
      return newSelected;
    });
  };

  // Funções auxiliares para verificar se um serviço está selecionado
  const isSelected = (categoryIndex: number, serviceId: number) => {
    return selectedServices[categoryIndex].includes(serviceId);
  };

  return (
    <div className="servicos-container">
      <Head>
        <title>Agenda Corte - Nossos Serviços</title>
        <meta name="description" content="Agende seus cortes de cabelo, barba e tratamentos na Agenda Corte." />
      </Head>

      <Header /> {/* Inclui o cabeçalho (que renderiza o botão de voltar) */}

      <main className="servicos-main-content">
        <section className="servicos-hero">
          <h1 className="servicos-title">BEM VINDO <span className="user-highlight">USER!</span></h1>
          <p className="servicos-description">
            No Agenda Corte, você agenda seus cortes de cabelo, barba e tratamentos de forma rápida, fácil e sem complicação.
            Escolha o horário perfeito, o profissional preferido e receba lembretes automáticos — tudo na palma da sua mão!
          </p>
        </section>

        <section className="servicos-categories">
          {/* Categoria de Cabelo (index 0) */}
          <div className="service-card">
            <div className="service-icon-circle">
              <Image
                src="/serviços/scissors 1.png" // Imagem para serviços de cabelo
                alt="Ícone de Tesoura - Cabelo"
                width={80}
                height={80}
                priority
              />
            </div>
            <h2 className="service-card-title">Corte</h2> {/* TÍTULO ALTERADO */}
            <ul className="service-list">
              <li onClick={() => handleServiceSelect(0, 1)}> {/* Service ID 1 */}
                <span className={`radio-circle ${isSelected(0, 1) ? 'selected' : ''}`}></span> Degradê médio + detalhe fino na navalha (lados bem alinhados, transição suave).
              </li>
              <li onClick={() => handleServiceSelect(0, 2)}> {/* Service ID 2 */}
                <span className={`radio-circle ${isSelected(0, 2) ? 'selected' : ''}`}></span> Low Fade + Topo Texturizado
                Degradê baixo + topo com tesoura para volume natural (versátil para qualquer ocasião).
              </li>
              <li onClick={() => handleServiceSelect(0, 3)}> {/* Service ID 3 */}
                <span className={`radio-circle ${isSelected(0, 3) ? 'selected' : ''}`}></span> Buzz Cut + Linha de Contorno
                Corte máquina rente + linha de contorno nítida (estilo limpo e moderno).
              </li>
            </ul>
          </div>

          {/* Categoria de Barba (index 1) */}
          <div className="service-card">
            <div className="service-icon-circle">
              <Image
                src="/serviços/beard 1.png" // Imagem para serviços de barba
                alt="Ícone de Barba"
                width={80}
                height={80}
                priority
                className="beard-icon" // Adicionado para estilizar apenas a barba
              />
            </div>
            <h2 className="service-card-title">Barba</h2> {/* TÍTULO ALTERADO */}
            <ul className="service-list">
              <li onClick={() => handleServiceSelect(1, 1)}> {/* Service ID 1 */}
                <span className={`radio-circle ${isSelected(1, 1) ? 'selected' : ''}`}></span> Degradê perfeito dos lados + detalhes artísticos (linhas geométricas ou símbolos personalizados).
              </li>
              <li onClick={() => handleServiceSelect(1, 2)}> {/* Service ID 2 */}
                <span className={`radio-circle ${isSelected(1, 2) ? 'selected' : ''}`}></span> Stuble Texturizado
                Barba rala aparada com precisão (3mm-5mm) contorno definido (estilo "homem moderno"
              </li>
              <li onClick={() => handleServiceSelect(1, 3)}> {/* Service ID 3 */}
                <span className={`radio-circle ${isSelected(1, 3) ? 'selected' : ''}`}></span> Van Dyke
                Bigode separado + cavanhaque alongado (toque vintage e sofisticado).
              </li>
            </ul>
          </div>

          {/* Categoria Corte + Barba (index 2) */}
          <div className="service-card">
            <div className="service-icon-circle">
              <Image
                src="/serviços/barbearia 1.png" // Imagem para serviços de barbearia geral / clássico
                alt="Ícone de Barbearia - Clássico"
                width={80}
                height={80}
                priority
              />
            </div>
            <h2 className="service-card-title">Corte + Barba</h2> {/* TÍTULO ALTERADO */}
            <ul className="service-list">
              <li onClick={() => handleServiceSelect(2, 1)}> {/* Service ID 1 */}
                <span className={`radio-circle ${isSelected(2, 1) ? 'selected' : ''}`}></span> Degradê perfeito dos lados + detalhes artísticos (linhas geométricas ou símbolos personalizados).
              </li>
              <li onClick={() => handleServiceSelect(2, 2)}> {/* Service ID 2 */}
                <span className={`radio-circle ${isSelected(2, 2) ? 'selected' : ''}`}></span> O Rebelde Controlado
                Barba: Dutch beard (laterais quadradas)
              </li>
              <li onClick={() => handleServiceSelect(2, 3)}> {/* Service ID 3 */}
                <span className={`radio-circle ${isSelected(2, 3) ? 'selected' : ''}`}></span> O Minimalista Sofisticado
                Barba: Circle beard (3cm de comprimento)
              </li>
            </ul>
          </div>
        </section>

        <section className="continue-button-section">
          <Link href="/barbeiros" passHref> {/* Link para a próxima tela (barbeiros) */}
            <button className="continue-button">Continua</button>
          </Link>
        </section>
      </main>
    </div>
  );
}