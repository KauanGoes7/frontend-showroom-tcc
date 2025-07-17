// src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-pequeno-container">
        {/* Logo pequena no canto superior esquerdo */}
        <Image
          src="/410441 1.png" // <--- CAMINHO ATUALIZADO para sua logo pequena
          alt="Logo Pequeno"
          width={40} // Ajuste a largura conforme necessário
          height={40} // Ajuste a altura conforme necessário
          priority // Prioriza o carregamento desta imagem
        />
      </div>
      {/* O ícone de usuário foi removido. O link de navegação "APRESENTAÇÃO" vai para a direita. */}
      <nav className="nav-links">
        <Link href="/apresentacao"> {/* Link para a futura página de apresentação */}
          <span className="nav-link-item">APRESENTAÇÃO</span>
        </Link>
      </nav>
    </header>
  );
}