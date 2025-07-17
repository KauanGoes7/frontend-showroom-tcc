// src/components/Header.tsx
'use client'; // Indica que este é um Client Component

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Importe useRouter e usePathname de 'next/navigation'

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); // Hook para acessar a rota atual

  // Define as rotas onde o botão de voltar deve aparecer
  const showBackButton = pathname === '/apresentacao' ||
                         pathname === '/servicos' ||
                         pathname === '/barbeiros' ||
                         pathname === '/agendar-data' || // Ajustado para agendar-data
                         pathname === '/confirmacao-agendamento'; // Ajustado para confirmacao-agendamento

  // Define as rotas onde a logo pequena deve aparecer no header
  const showSmallLogo = showBackButton;

  // Renderiza o cabeçalho
  return (
    <header className={`
      ${pathname === '/' ? 'home-header' : 'header-placeholder'}
      ${showSmallLogo ? 'with-small-logo' : ''}
    `}>
      {showBackButton ? (
        <button className="back-button-header" onClick={() => router.back()}>
          <Image
            src="/icones/seta-para-a-esquerda-3.png" // Certifique-se de que este caminho está correto
            alt="Voltar"
            width={24}
            height={24}
            priority
          />
        </button>
      ) : (
        // Se não for para mostrar o botão de voltar na Home, ainda precisamos de um placeholder
        // ou ajustar o layout da Home para não ter este espaço vazio.
        // Por enquanto, uma div vazia para manter o layout no caso de header-placeholder.
        <div style={{ width: '24px' }}></div> // Espaço para alinhar com o back button
      )}

      {showSmallLogo && (
        <div className="logo-pequeno-container">
          <Link href="/">
            <Image
              src="/agenda-corte-logo.png" // Sua logo pequena
              alt="Agenda Corte Logo"
              width={60} // Ajuste o tamanho conforme necessário
              height={60}
              priority
            />
          </Link>
        </div>
      )}

      {pathname === '/' ? (
        <nav className="nav-links">
          <Link href="/apresentacao" className="nav-link-item">
            Apresentação
          </Link>
          <Link href="/funcionalidade" className="nav-link-item">
            Funcionalidade
          </Link>
        </nav>
      ) : (
        <div className="nav-links-placeholder"></div> // Placeholder para alinhar, se necessário
      )}

      <div className="profile-icon">
        <Image
          src="/icones/user-icon.png" // Ícone de perfil
          alt="Ícone de Perfil"
          width={28}
          height={28}
          priority
        />
      </div>
    </header>
  );
}