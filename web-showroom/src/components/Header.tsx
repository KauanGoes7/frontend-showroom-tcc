// src/components/Header.tsx
'use client'; // Indica que este é um Client Component

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Importe useRouter e usePathname de 'next/navigation'

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); // Hook para acessar a rota atual

  // Define se é a Home Page
  const isHomePage = pathname === '/';
  // Define as rotas onde o botão de voltar deve aparecer
  const showBackButton = !isHomePage && pathname !== '/confirmacao-agendamento'; // Botão de voltar não aparece na home nem na confirmação
  // Define as rotas onde a logo pequena deve aparecer no header (em páginas internas)
  const showSmallLogoInternal = showBackButton;

  return (
    <header className={isHomePage ? 'home-header' : 'header-placeholder'}>
      {isHomePage ? (
        // Conteúdo do Header para a Home Page
        <>
          <div className="home-logo-corner">
            <Link href="/">
              <Image
                src="/410441 1.png" // Sua logo pequena no canto da Home
                alt="Agenda Corte Logo"
                width={28} // Tamanho da logo na esquina da Home
                height={28}
                priority
              />
            </Link>
          </div>
          <nav className="home-nav-links">
            <Link href="/apresentacao" className="nav-link-item">
              Apresentação
            </Link>
            {/* Ícone de perfil para a Home Page, alinhado com os links de navegação */}
            
          </nav>
        </>
      ) : (
        // Conteúdo do Header para Páginas Internas
        <>
    
          

          
          

        

        
        </>
      )}
    </header>
  );
}