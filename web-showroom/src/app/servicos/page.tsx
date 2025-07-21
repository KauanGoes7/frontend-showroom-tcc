// src/app/servicos/page.tsx
'use client'; // Necessário para usar hooks do React no Next.js App Router

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


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


export default function ServicosPage() {
  const [selectedServices, setSelectedServices] = useState<number[][]>([[], [], []]);
  const router = useRouter(); // <--- INICIALIZE O useRouter AQUI

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

  // <--- ADICIONE ESTA FUNÇÃO PARA LIDAR COM O BOTÃO CONTINUA
  const handleContinue = () => {
    // Flatten the array of arrays into a single array of selected service IDs
    const allSelectedServiceIds = selectedServices.flat();
    
    // Check if at least one service is selected (you can refine this logic)
    if (allSelectedServiceIds.length === 0) {
      alert('Por favor, selecione pelo menos um serviço para continuar.');
      return;
    }

    // Save the selected service IDs to localStorage
    // Convertendo para string antes de salvar
    localStorage.setItem('selectedServiceIds', JSON.stringify(allSelectedServiceIds));

    // Navega para a próxima página
    router.push('/barbeiros');
  };
  // ADICIONE ESTA FUNÇÃO PARA LIDAR COM O BOTÃO CONTINUA --->

  return (
    <div className="servicos-container">
      <Head>
        <title>Agenda Corte - Nossos Serviços</title>
        <meta name="description" content="Agende seus cortes de cabelo, barba e tratamentos na Agenda Corte." />
      </Head>

      {/* --- USO DO BOTÃO DE VOLTAR (ADICIONADO AQUI) --- */}
      <BackButton />
      {/* --- FIM DO USO DO BOTÃO DE VOLTAR --- */}

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
                src="/servicos/scissors 1.png" // Imagem para serviços de cabelo
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
                src="/servicos/beard 1.png" // Imagem para serviços de barba
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
                src="/servicos/barbearia 1.png" // Imagem para serviços de barbearia geral / clássico
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
          {/* O BOTÃO AGORA CHAMA A FUNÇÃO handleContinue */}
          <button
            className="continue-button"
            onClick={handleContinue}
            // O botão deve estar desabilitado se nenhuma opção foi selecionada
            disabled={selectedServices.flat().length === 0}
          >
            Continua
          </button>
        </section>
      </main>
    </div>
  );
}